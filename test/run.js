'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var root = path.resolve(__dirname, '..');
var pluginPath = path.join(root, 'compact.js');
var source = fs.readFileSync(pluginPath, 'utf8');
var passed = 0;

function test(name, fn) {
    return Promise.resolve().then(fn).then(function () {
        passed += 1;
        process.stdout.write('ok - ' + name + '\n');
    });
}

function staticChecks() {
    var banned = [
        { name: 'let', regex: /\blet\b/ },
        { name: 'const', regex: /\bconst\b/ },
        { name: 'arrow function', regex: /=>/ },
        { name: 'template literal', regex: /`/ },
        { name: 'async function', regex: /\basync\s+function\b/ },
        { name: 'await', regex: /\bawait\b/ },
        { name: 'Promise', regex: /\bPromise\b/ },
        { name: 'Array.includes', regex: /\.includes\s*\(/ },
        { name: 'optional chaining', regex: /\?\.[A-Za-z_$[]/ },
        { name: 'nullish coalescing', regex: /\?\?/ }
    ];
    var i;
    new vm.Script(source, { filename: 'compact.js' });
    for (i = 0; i < banned.length; i++) {
        assert.strictEqual(banned[i].regex.test(source), false, 'Forbidden syntax: ' + banned[i].name);
    }
    assert(source.length >= 35 * 1024, 'Plugin is unexpectedly small');
    assert(source.length <= 60 * 1024, 'Plugin exceeds the target size');
}

function makeEnvironment(options) {
    var opts = options || {};
    var rows = [];
    var components = [];
    var params = [];
    var pushes = [];
    var selections = [];
    var notices = [];
    var storage = opts.initialStorage || {};
    var network = {
        calls: 0,
        active: 0,
        maxActive: 0,
        clearCalls: 0
    };
    var responder = opts.responder || function () {
        return {
            page: 1,
            total_pages: 4,
            results: [{
                id: network.calls,
                title: 'Русский фильм ' + network.calls,
                overview: 'Описание',
                vote_count: 500,
                genre_ids: [18],
                adult: false
            }]
        };
    };

    function MockRequest() {
        var cleared = false;
        this.timeout = function () {};
        this.clear = function () {
            if (!cleared) network.clearCalls += 1;
            cleared = true;
        };
        this.silent = function (url, success, failure) {
            var result;
            network.calls += 1;
            network.active += 1;
            network.maxActive = Math.max(network.maxActive, network.active);
            result = responder(url, network.calls);
            if (result && result.hang) return;
            setTimeout(function () {
                network.active -= 1;
                if (result && result.error) failure(result.error);
                else success(result);
            }, 4);
        };
    }

    var Lampa = {
        Storage: {
            get: function (key, fallback) {
                return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : fallback;
            },
            set: function (key, value) {
                storage[key] = value;
            }
        },
        TMDB: {
            api: function (url) { return 'https://tmdb.test/' + url; }
        },
        Maker: {
            make: function (type, data) {
                var classes = [];
                return {
                    data: data,
                    __classes: classes,
                    html: {
                        addClass: function (name) { classes.push(name); }
                    }
                };
            }
        },
        Api: { sources: {} },
        ContentRows: opts.withoutContentRows ? null : {
            add: function (row) { rows.push(row); }
        },
        SettingsApi: {
            addComponent: function (item) { components.push(item); },
            addParam: function (item) { params.push(item); }
        },
        Activity: { push: function (item) { pushes.push(item); } },
        Select: { show: function (item) { selections.push(item); }, close: function () {} },
        Controller: { toggle: function () {} },
        Listener: { follow: function () {} },
        Noty: { show: function (message) { notices.push(message); } }
    };
    if (opts.legacyRequest) Lampa.Reguest = MockRequest;
    else Lampa.Request = MockRequest;
    var sandbox = {
        window: { appready: true, Lampa: Lampa },
        setTimeout: function (fn, delay) { return setTimeout(fn, Math.min(delay, 25)); },
        clearTimeout: clearTimeout,
        Date: Date,
        Math: Math,
        JSON: JSON,
        Number: Number,
        parseInt: parseInt,
        isNaN: isNaN,
        encodeURIComponent: encodeURIComponent,
        console: console
    };
    vm.runInNewContext(source, sandbox, { filename: 'compact.js' });
    return {
        plugin: sandbox.window.LampaCompact,
        Lampa: Lampa,
        rows: rows,
        components: components,
        params: params,
        pushes: pushes,
        selections: selections,
        notices: notices,
        storage: storage,
        network: network
    };
}

function fetchAsync(env, route) {
    return new Promise(function (resolve) {
        env.plugin.__test.fetchRoute(route, 1, function (data, meta) {
            resolve({ data: data, meta: meta });
        });
    });
}

staticChecks();

test('registers settings, source and eight ordered rows', function () {
    var env = makeEnvironment();
    assert.strictEqual(env.components.length, 1);
    assert.strictEqual(env.params.length, 12);
    assert(env.Lampa.Api.sources.compact);
    assert.strictEqual(env.rows.length, 8);
    assert.deepStrictEqual(env.rows.map(function (row) { return row.index; }),
        [10, 20, 30, 40, 50, 60, 70, 80]);
    assert(env.rows.every(function (row) { return !!row.title; }));
    assert(env.rows.every(function (row) { return !row.onInstance; }));
    assert.strictEqual(env.storage.content_rows_shots_main, 'false');
}).then(function () {
    return test('honors the master switch without removing the source', function () {
        var env = makeEnvironment({ initialStorage: { compact_enabled: false } });
        assert.strictEqual(env.rows.length, 0);
        assert(env.Lampa.Api.sources.compact);
        assert.strictEqual(env.params.length, 12);
    });
}).then(function () {
    return test('returns navigation rows synchronously', function () {
        var env = makeEnvironment();
        var called = false;
        var output;
        env.rows[0].call() (function (data) {
            called = true;
            output = data;
        });
        assert.strictEqual(called, true);
        assert.strictEqual(output.results.length, 3);
        assert.strictEqual(output.results[0].compact_route, 'compact:new:all:recent:new');
        assert.strictEqual(output.params.items.mapping, 'line');
    });
}).then(function () {
    return test('opens provider sorting and a paginated category from the remote handler', function () {
        var env = makeEnvironment();
        var rowData;
        env.rows[1].call()(function (data) { rowData = data; });
        assert(rowData.results[0].params.emit.onlyEnter);
        rowData.results[0].params.emit.onlyEnter();
        assert.strictEqual(env.selections.length, 1);
        assert.strictEqual(env.selections[0].items.length, 7);
        env.selections[0].onSelect(env.selections[0].items[4]);
        assert.strictEqual(env.pushes.length, 1);
        assert.strictEqual(env.pushes[0].component, 'category_full');
        assert.strictEqual(env.pushes[0].source, 'compact');
        assert.strictEqual(env.pushes[0].url, 'compact:provider:tv:8:popular:US');
    });
}).then(function () {
    return test('routes the More action to category_full instead of truncating at the home row', function () {
        var env = makeEnvironment();
        return new Promise(function (resolve, reject) {
            env.rows[4].call()(function (data) {
                try {
                    assert(data.params.emit.onlyMore);
                    data.params.emit.onlyMore();
                    assert.strictEqual(env.pushes[0].component, 'category_full');
                    assert.strictEqual(env.pushes[0].url, 'compact:trend:movie:week:popular');
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    });
}).then(function () {
    return test('uses wide custom cards for navigation, providers and genres', function () {
        var env = makeEnvironment();
        var navigation;
        var providers;
        var genres;
        var instance;
        env.rows[0].call()(function (data) { navigation = data; });
        env.rows[1].call()(function (data) { providers = data; });
        env.rows[2].call()(function (data) { genres = data; });
        assert(navigation.results[0].poster.indexOf('data:image/svg+xml') === 0);
        assert.strictEqual(navigation.results[0].poster_path, undefined);
        assert(providers.results[0].poster.indexOf('data:image/svg+xml') === 0);
        assert.strictEqual(providers.results[0].poster_path, undefined);
        assert.strictEqual(providers.params.items.mapping, 'line');
        assert.strictEqual(genres.params.items.mapping, 'line');
        assert.strictEqual(providers.results[0].compact_kind, 'provider');
        assert.strictEqual(genres.results[0].compact_kind, 'genre');
        instance = providers.results[0].params.createInstance.call(providers.results[0]);
        providers.results[0].params.emit.onCreate.call(instance);
        assert(instance.__classes.indexOf('compact-action-card') !== -1);
        assert(instance.__classes.indexOf('compact-action-card--provider') !== -1);
        assert(providers.title.indexOf('JustWatch') !== -1);
    });
}).then(function () {
    return test('stops cleanly on an unsupported Lampa API', function () {
        var env = makeEnvironment({ withoutContentRows: true });
        assert.strictEqual(env.rows.length, 0);
        assert.strictEqual(env.Lampa.Api.sources.compact, undefined);
        assert.strictEqual(env.notices.length, 1);
        assert(env.notices[0].indexOf('не поддерживается') !== -1);
    });
}).then(function () {
    return test('keeps movie and TV genre/sort plans separate', function () {
        var env = makeEnvironment();
        var movie = env.plugin.__test.requestPlans('compact:genre:movie:28:revenue', 3, false);
        var tv = env.plugin.__test.requestPlans('compact:genre:tv:10759:new', 2, false);
        assert.strictEqual(movie.length, 1);
        assert(movie[0].path.indexOf('discover/movie?') === 0);
        assert(movie[0].path.indexOf('revenue.desc') !== -1);
        assert(tv[0].path.indexOf('discover/tv?') === 0);
        assert(tv[0].path.indexOf('first_air_date.desc') !== -1);
    });
}).then(function () {
    return test('filters duplicate, unsafe and low-vote cards', function () {
        var env = makeEnvironment();
        var filter = env.plugin.__test.filterItems;
        var items = filter([
            { id: 1, title: 'Хороший фильм', overview: 'Описание', vote_count: 300, genre_ids: [18] },
            { id: 1, title: 'Дубль', overview: 'Описание', vote_count: 300, genre_ids: [18] },
            { id: 2, title: 'Плохой', overview: 'Эротика', vote_count: 300, genre_ids: [18] },
            { id: 3, title: 'Мало', overview: 'Описание', vote_count: 2, genre_ids: [18] },
            { id: 4, title: 'Adult', overview: 'Описание', vote_count: 300, genre_ids: [18], adult: true }
        ], 'movie', false);
        assert.strictEqual(items.length, 1);
        assert.strictEqual(items[0].id, 1);
    });
}).then(function () {
    return test('passes category page number through to TMDB and response', function () {
        var seenUrl = '';
        var env = makeEnvironment({
            responder: function (url) {
                seenUrl = url;
                return {
                    page: 2,
                    total_pages: 7,
                    results: [{ id: 22, title: 'Страница два', overview: 'Описание', vote_count: 500 }]
                };
            }
        });
        return new Promise(function (resolve, reject) {
            env.Lampa.Api.sources.compact.category({
                url: 'compact:genre:movie:28:popular',
                page: 2
            }, function (data) {
                try {
                    assert(seenUrl.indexOf('page=2') !== -1);
                    assert.strictEqual(data.page, 2);
                    assert.strictEqual(data.total_pages, 7);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }, reject);
        });
    });
}).then(function () {
    return test('supports the legacy Lampa.Reguest network name', function () {
        var env = makeEnvironment({ legacyRequest: true });
        return fetchAsync(env, 'compact:trend:movie:week:popular').then(function (result) {
            assert.strictEqual(result.data.results.length, 1);
            assert.strictEqual(env.network.calls, 1);
        });
    });
}).then(function () {
    return test('never exceeds two concurrent TMDB requests', function () {
        var env = makeEnvironment();
        return Promise.all([
            fetchAsync(env, 'compact:quality:all:recent:rating'),
            fetchAsync(env, 'compact:new:all:recent:new'),
            fetchAsync(env, 'compact:russian:all:ru:new')
        ]).then(function () {
            assert(env.network.calls >= 6);
            assert(env.network.maxActive <= 2);
            assert.strictEqual(env.plugin.__test.queueState().active, 0);
        });
    });
}).then(function () {
    return test('serves a fresh compact cache without another request', function () {
        var env = makeEnvironment();
        return fetchAsync(env, 'compact:trend:movie:week:popular').then(function (first) {
            var calls = env.network.calls;
            assert.strictEqual(first.data.results.length, 1);
            return fetchAsync(env, 'compact:trend:movie:week:popular').then(function (second) {
                assert.strictEqual(env.network.calls, calls);
                assert.strictEqual(second.meta.freshCache, true);
            });
        });
    });
}).then(function () {
    return test('bounds persistent cache to 36 compact pages', function () {
        var env = makeEnvironment();
        var jobs = [];
        var i;
        var live = 0;
        var key;
        for (i = 0; i < 37; i++) {
            jobs.push(fetchAsync(env, 'compact:trend:movie:variant' + i + ':popular'));
        }
        return Promise.all(jobs).then(function () {
            for (key in env.storage) {
                if (Object.prototype.hasOwnProperty.call(env.storage, key) &&
                    key.indexOf('compact_cache_v1_') === 0 && key !== 'compact_cache_v1_index' &&
                    env.storage[key]) live += 1;
            }
            assert.strictEqual(live, 36);
            assert.strictEqual(env.storage.compact_cache_v1_index.length, 36);
            assert.strictEqual(env.plugin.__test.constants.cacheMaxEntries, 36);
        });
    });
}).then(function () {
    return test('joins simultaneous requests for the same catalog', function () {
        var env = makeEnvironment();
        return Promise.all([
            fetchAsync(env, 'compact:trend:movie:week:popular'),
            fetchAsync(env, 'compact:trend:movie:week:popular')
        ]).then(function (values) {
            assert.strictEqual(env.network.calls, 1);
            assert.strictEqual(values[0].data.results.length, 1);
            assert.strictEqual(values[1].data.results.length, 1);
        });
    });
}).then(function () {
    return test('shows stale cache immediately and refreshes in background', function () {
        var env = makeEnvironment();
        var route = 'compact:trend:movie:week:popular';
        return fetchAsync(env, route).then(function () {
            var key = 'compact_cache_v1_' + env.plugin.__test.cacheKey(route, 1);
            var before = env.network.calls;
            var sync = true;
            var wasSync = false;
            env.storage[key].saved = new Date().getTime() - (9 * 60 * 60 * 1000);
            env.plugin.clearMemoryCache();
            env.plugin.__test.fetchRoute(route, 1, function (data, meta) {
                wasSync = sync;
                assert.strictEqual(meta.staleCache, true);
                assert.strictEqual(data.results.length, 1);
            });
            sync = false;
            assert.strictEqual(wasSync, true);
            assert.strictEqual(env.network.calls, before + 1);
            return new Promise(function (resolve) { setTimeout(resolve, 10); });
        });
    });
}).then(function () {
    return test('times out safely and performs only one fallback', function () {
        var env = makeEnvironment({
            responder: function () { return { hang: true }; }
        });
        return fetchAsync(env, 'compact:trend:movie:week:popular').then(function (result) {
            assert.strictEqual(result.data.results.length, 0);
            assert.strictEqual(result.meta.failed, true);
            assert.strictEqual(env.network.calls, 2);
            assert.strictEqual(env.network.clearCalls, 2);
            assert.strictEqual(env.plugin.__test.constants.timeout, 6500);
        });
    });
}).then(function () {
    process.stdout.write('\n' + passed + ' checks passed\n');
}).catch(function (error) {
    console.error(error && error.stack ? error.stack : error);
    process.exitCode = 1;
});
