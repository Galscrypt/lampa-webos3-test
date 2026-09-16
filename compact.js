(function (window) {
    'use strict';

    /*
     * Compact catalog for Lampa.
     * Original implementation. No code or artwork from SURS is included.
     * Target: webOS 3.5 / Chromium 38 / ES5.
     */

    if (!window || window.plugin_compact_ready) return;
    window.plugin_compact_ready = true;

    var VERSION = '0.2.1';
    var SOURCE = 'compact';
    var CACHE_PREFIX = 'compact_cache_v1_';
    var CACHE_INDEX = 'compact_cache_v1_index';
    var CACHE_LIFE = 8 * 60 * 60 * 1000;
    var CACHE_STALE = 7 * 24 * 60 * 60 * 1000;
    var CACHE_MAX_ENTRIES = 36;
    var REQUEST_TIMEOUT = 6500;
    var MAX_ACTIVE = 2;
    var HOME_LIMIT = 20;
    var BAD_WORDS = [
        'эротик', 'порно', 'секс', 'hentai', 'эротика', 'интим', 'playboy'
    ];

    var DEFAULTS = {
        compact_enabled: true,
        compact_navigation: true,
        compact_global: true,
        compact_russian: true,
        compact_genres: true,
        compact_trend_movie: true,
        compact_trend_tv: true,
        compact_quality: true,
        compact_theme: true,
        compact_min_votes: '150',
        compact_cyrillic: false,
        compact_age: '16'
    };

    var GLOBAL_PROVIDERS = [
        { id: 8, title: 'Netflix', color: '#d71920', region: 'US', logo: '/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg' },
        { id: 337, title: 'Disney+', color: '#173b78', region: 'US', logo: '/97yvRBw1GzX7fXprcF80er19ot.jpg' },
        { id: 119, title: 'Prime Video', color: '#087aa5', region: 'US', logo: '/pvske1MyAoymrs5bguRfVqYiM9a.jpg' },
        { id: 350, title: 'Apple TV+', color: '#202124', region: 'US', logo: '/2E03IAZsX4ZaUqM7tXlctEPMGWS.jpg' },
        { id: 1899, title: 'Max', color: '#5b39d4', region: 'US', logo: '/fksCUZ9QDWZMUwL2LgMtLckROUN.jpg' },
        { id: 531, title: 'Paramount+', color: '#1264d1', region: 'US', logo: '/h5DcR0J2EESLitnhR8xLG1QymTE.jpg' }
    ];

    var RUSSIAN_PROVIDERS = [
        { id: 117, title: 'Кинопоиск', color: '#f28b00', region: 'RU', logo: '/51wuCkUdkEQTUtB8TrtZzzxp3Tj.jpg' },
        { id: 115, title: 'Okko', color: '#5b25d5', region: 'RU', logo: '/5z8dpQN27kybhn21EVLZcJPpMEo.jpg' },
        { id: 113, title: 'Иви', color: '#e22683', region: 'RU', logo: '/4smEkH3vlf5V3vo2vwrOQ6Chb35.jpg' },
        { id: 116, title: 'Amediateka', color: '#6e26d9', region: 'RU', logo: '/dNaqCdDy4wsIzjZoYwvLRiOK4Tx.jpg' },
        { id: 570, title: 'Premier', color: '#252525', region: 'RU', logo: '/r7cgAhlSLI4r80P1Si9P0jOevrr.jpg' }
    ];

    var MOVIE_GENRES = [
        { id: 28, title: 'Боевики', color: '#a83232' },
        { id: 12, title: 'Приключения', color: '#926d24' },
        { id: 16, title: 'Анимация', color: '#3778a8' },
        { id: 35, title: 'Комедии', color: '#9b7f25' },
        { id: 80, title: 'Криминал', color: '#424952' },
        { id: 99, title: 'Документальные', color: '#36715b' },
        { id: 18, title: 'Драмы', color: '#7b4269' },
        { id: 10751, title: 'Семейные', color: '#2e7f83' },
        { id: 14, title: 'Фэнтези', color: '#644497' },
        { id: 36, title: 'История', color: '#725b3b' },
        { id: 27, title: 'Ужасы', color: '#4b2424' },
        { id: 878, title: 'Фантастика', color: '#275b81' }
    ];

    var TV_GENRES = [
        { id: 10759, title: 'Экшен-сериалы', color: '#973b35' },
        { id: 16, title: 'Анимация', color: '#397aae' },
        { id: 35, title: 'Комедийные', color: '#9a7d27' },
        { id: 80, title: 'Криминальные', color: '#424952' },
        { id: 99, title: 'Документальные', color: '#36715b' },
        { id: 18, title: 'Драматические', color: '#7b4269' },
        { id: 10751, title: 'Семейные', color: '#2e7f83' },
        { id: 10762, title: 'Детские', color: '#3a7d60' },
        { id: 9648, title: 'Детективы', color: '#4a5474' },
        { id: 10765, title: 'Фантастика', color: '#275b81' }
    ];

    var MOVIE_SORTS = [
        { id: 'popular', title: 'Популярные', key: 'popularity.desc' },
        { id: 'rating', title: 'По рейтингу', key: 'vote_average.desc' },
        { id: 'new', title: 'Сначала новые', key: 'primary_release_date.desc' },
        { id: 'revenue', title: 'По сборам', key: 'revenue.desc' }
    ];

    var TV_SORTS = [
        { id: 'popular', title: 'Популярные', key: 'popularity.desc' },
        { id: 'rating', title: 'По рейтингу', key: 'vote_average.desc' },
        { id: 'new', title: 'Сначала новые', key: 'first_air_date.desc' }
    ];

    var queue = [];
    var active = 0;
    var memoryCache = {};
    var refreshLocks = {};
    var Lampa = null;
    var started = false;

    function noop() {}

    function now() {
        return new Date().getTime();
    }

    function pad(value) {
        return value < 10 ? '0' + value : '' + value;
    }

    function dateText(date) {
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    }

    function daysAgo(count) {
        return dateText(new Date(now() - count * 24 * 60 * 60 * 1000));
    }

    function daysAhead(count) {
        return dateText(new Date(now() + count * 24 * 60 * 60 * 1000));
    }

    function stringValue(value) {
        if (value === null || typeof value === 'undefined') return '';
        return '' + value;
    }

    function boolValue(value, fallback) {
        if (value === null || typeof value === 'undefined' || value === '') return fallback;
        if (value === false || value === 0 || value === 'false' || value === '0') return false;
        return true;
    }

    function intValue(value, fallback) {
        var parsed = parseInt(value, 10);
        return isNaN(parsed) ? fallback : parsed;
    }

    function setting(name) {
        var fallback = DEFAULTS[name];
        var value;
        try {
            value = Lampa && Lampa.Storage ? Lampa.Storage.get(name, fallback) : fallback;
        } catch (error) {
            value = fallback;
        }
        return value;
    }

    function settingOn(name) {
        return boolValue(setting(name), DEFAULTS[name]);
    }

    function arrayIndexOf(array, value) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i] === value) return i;
        }
        return -1;
    }

    function cloneObject(input) {
        var output = {};
        var key;
        if (!input) return output;
        for (key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) output[key] = input[key];
        }
        return output;
    }

    function encodeQuery(parts) {
        var query = [];
        var key;
        for (key in parts) {
            if (Object.prototype.hasOwnProperty.call(parts, key) && parts[key] !== '' &&
                parts[key] !== null && typeof parts[key] !== 'undefined') {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(parts[key]));
            }
        }
        return query.join('&');
    }

    function providerLogoUrl(path) {
        if (!path) return '';
        try {
            if (Lampa && Lampa.TMDB && Lampa.TMDB.image) {
                return Lampa.TMDB.image('t/p/w300' + path);
            }
        } catch (error) {}
        return 'https://image.tmdb.org/t/p/w300' + path;
    }

    function makeActionInstance(data) {
        return Lampa.Maker.make('Card', data, function (module) {
            return module.only('Card', 'Callback');
        });
    }

    function actionContent(instance, card) {
        var root;
        var view;
        var content;
        var logo;
        var mark;
        var title;
        var subtitle;
        var accent;
        if (typeof document === 'undefined' || !card) return;
        root = instance && instance.html ? instance.html[0] : null;
        if (!root || !root.querySelector) return;
        view = root.querySelector('.card__view');
        if (!view || view.querySelector('.compact-action-card__content')) return;

        content = document.createElement('div');
        content.className = 'compact-action-card__content compact-action-card__content--' + card.compact_kind;

        if (card.compact_kind === 'provider' && card.compact_logo) {
            logo = document.createElement('img');
            logo.className = 'compact-action-card__logo';
            logo.src = card.compact_logo;
            logo.alt = card.compact_display_title;
            content.appendChild(logo);
        } else if (card.compact_kind === 'genre') {
            mark = document.createElement('span');
            mark.className = 'compact-action-card__mark';
            mark.style.backgroundColor = card.compact_color;
            mark.appendChild(document.createTextNode(card.compact_display_title.charAt(0).toUpperCase()));
            content.appendChild(mark);
        }

        title = document.createElement('span');
        title.className = 'compact-action-card__label';
        title.appendChild(document.createTextNode(card.compact_display_title));
        content.appendChild(title);

        if (card.compact_display_subtitle) {
            subtitle = document.createElement('span');
            subtitle.className = 'compact-action-card__subtitle';
            subtitle.appendChild(document.createTextNode(card.compact_display_subtitle));
            content.appendChild(subtitle);
        }

        accent = document.createElement('span');
        accent.className = 'compact-action-card__accent';
        accent.style.backgroundColor = card.compact_color;
        content.appendChild(accent);
        view.appendChild(content);
    }

    function styleActionInstance(instance, card) {
        if (!instance || !instance.html || !instance.html.addClass) return;
        instance.html.addClass('compact-action-card');
        instance.html.addClass('compact-action-card--' + card.compact_kind);
        actionContent(instance, card);
    }

    function actionRowParams() {
        return {
            items: {
                view: 20,
                mapping: 'line'
            }
        };
    }

    function injectCompactStyles() {
        var css;
        var style;
        if (typeof document === 'undefined' || document.getElementById('compact-action-styles')) return;
        css = '.compact-action-card{width:13em!important}' +
            '.compact-action-card .card__view{padding-bottom:56.25%!important;border-radius:1em!important;overflow:hidden!important;background:rgba(255,255,255,.12)!important}' +
            '.compact-action-card .card__img,.compact-action-card .card__loader{display:none!important}' +
            '.compact-action-card .card__title,.compact-action-card .card__age,.compact-action-card .card__vote{display:none!important}' +
            '.compact-action-card__content{position:absolute;z-index:2;top:0;right:0;bottom:0;left:0;display:flex;box-sizing:border-box;align-items:center;justify-content:center;flex-direction:column;padding:1em;text-align:center;color:#fff;background:rgba(12,20,32,.28)}' +
            '.compact-action-card__content--navigation{background:rgba(22,35,52,.7)}' +
            '.compact-action-card__content--genre{align-items:flex-start;padding-left:4.5em;text-align:left;background:rgba(12,20,32,.46)}' +
            '.compact-action-card__logo{display:block;max-width:68%;max-height:48%;margin:0 auto .55em;object-fit:contain;border-radius:.25em}' +
            '.compact-action-card__label{display:block;max-width:100%;font-size:1.05em;font-weight:700;line-height:1.12;white-space:normal}' +
            '.compact-action-card--provider .compact-action-card__label{font-size:.82em;opacity:.82}' +
            '.compact-action-card__subtitle{display:block;margin-top:.35em;font-size:.67em;line-height:1.1;opacity:.62}' +
            '.compact-action-card__mark{position:absolute;left:1em;top:50%;width:2.65em;height:2.65em;margin-top:-1.325em;border-radius:50%;font-size:1.15em;font-weight:700;line-height:2.65em;text-align:center}' +
            '.compact-action-card__accent{position:absolute;left:34%;right:34%;bottom:.65em;height:.18em;border-radius:.15em}' +
            '.compact-action-card.focus .card__view,.compact-action-card.hover .card__view{background:rgba(255,255,255,.2)!important}' +
            '.compact-action-card.focus .card__view:after{border-radius:1em!important}' +
            '@media screen and (max-width:767px){.compact-action-card{width:9.5em!important}}';
        style = document.createElement('style');
        style.id = 'compact-action-styles';
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        (document.head || document.body).appendChild(style);
    }

    function navigationCard(id, title, color, route, subtitle, logo) {
        var kind = logo ? 'provider' : (route.indexOf('compact:genre:') === 0 ? 'genre' : 'navigation');
        var displayTitle = kind === 'genre' ? title.replace(/ ·.*$/, '') : title;
        var displaySubtitle = kind === 'genre' ? (route.indexOf(':tv:') !== -1 ? 'Сериалы' : 'Фильмы') : subtitle;
        var card = {
            id: -100000 - id,
            compact_navigation: true,
            compact_route: route,
            title: title,
            name: title,
            original_title: subtitle || title,
            overview: subtitle || '',
            compact_kind: kind,
            compact_color: color,
            compact_logo: providerLogoUrl(logo),
            compact_display_title: displayTitle,
            compact_display_subtitle: displaySubtitle,
            source: SOURCE,
            media_type: 'movie',
            vote_average: 0,
            params: {
                createInstance: function () {
                    return makeActionInstance(this);
                },
                emit: {
                    onCreate: function () {
                        styleActionInstance(this, card);
                    },
                    onlyEnter: function () {
                        openNavigation(card);
                    }
                }
            }
        };
        return card;
    }

    function normalizeMedia(item, forcedType) {
        var type = item.media_type || forcedType || (item.name ? 'tv' : 'movie');
        var output = cloneObject(item);
        output.media_type = type === 'tv' ? 'tv' : 'movie';
        output.source = 'tmdb';
        if (output.media_type === 'tv') {
            if (!output.title) output.title = output.name;
            if (!output.original_title) output.original_title = output.original_name;
        } else if (!output.name) {
            output.name = output.title;
        }
        return output;
    }

    function compactCard(item) {
        return {
            id: item.id,
            media_type: item.media_type,
            source: 'tmdb',
            title: item.title || '',
            name: item.name || '',
            original_title: item.original_title || '',
            original_name: item.original_name || '',
            overview: item.overview || '',
            poster_path: item.poster_path || '',
            backdrop_path: item.backdrop_path || '',
            release_date: item.release_date || '',
            first_air_date: item.first_air_date || '',
            vote_average: item.vote_average || 0,
            vote_count: item.vote_count || 0,
            genre_ids: item.genre_ids || [],
            original_language: item.original_language || '',
            adult: item.adult === true,
            popularity: item.popularity || 0
        };
    }

    function hasCyrillic(value) {
        return /[\u0400-\u04ff]/.test(stringValue(value));
    }

    function hasBadWords(item) {
        var text = (stringValue(item.title) + ' ' + stringValue(item.name) + ' ' +
            stringValue(item.original_title) + ' ' + stringValue(item.original_name) + ' ' +
            stringValue(item.overview)).toLowerCase();
        var i;
        for (i = 0; i < BAD_WORDS.length; i++) {
            if (text.indexOf(BAD_WORDS[i]) !== -1) return true;
        }
        return false;
    }

    function containsGenre(item, ids) {
        var genres = item.genre_ids || [];
        var i;
        for (i = 0; i < ids.length; i++) {
            if (arrayIndexOf(genres, ids[i]) !== -1) return true;
        }
        return false;
    }

    function allowedByAge(item, mode) {
        if (item.adult === true) return false;
        if (mode === 'off' || mode === '18') return true;
        if (mode === '0') return !containsGenre(item, [27, 53, 80, 10759, 10765]);
        if (mode === '6') return !containsGenre(item, [27, 53, 80, 9648]);
        if (mode === '12') return !containsGenre(item, [27]);
        return true;
    }

    function filterItems(items, forcedType, relaxed) {
        var result = [];
        var seen = {};
        var minVotes = intValue(setting('compact_min_votes'), 150);
        var requireCyrillic = boolValue(setting('compact_cyrillic'), false);
        var age = stringValue(setting('compact_age')) || '16';
        var i;
        var item;
        var key;
        var localText;
        if (relaxed) minVotes = Math.floor(minVotes / 2);
        for (i = 0; i < (items || []).length; i++) {
            item = normalizeMedia(items[i], forcedType);
            key = item.media_type + ':' + item.id;
            localText = stringValue(item.title || item.name) + ' ' + stringValue(item.overview);
            if (!item.id || seen[key]) continue;
            if (intValue(item.vote_count, 0) < minVotes) continue;
            if (requireCyrillic && !hasCyrillic(localText)) continue;
            if (!allowedByAge(item, age)) continue;
            if (hasBadWords(item)) continue;
            seen[key] = true;
            result.push(item);
        }
        return result;
    }

    function mergeUnique(left, right) {
        var output = [];
        var seen = {};
        var all = (left || []).concat(right || []);
        var i;
        var item;
        var key;
        for (i = 0; i < all.length; i++) {
            item = all[i];
            key = (item.media_type || (item.name ? 'tv' : 'movie')) + ':' + item.id;
            if (!item.id || seen[key]) continue;
            seen[key] = true;
            output.push(item);
        }
        return output;
    }

    function cacheStorageGet(key) {
        var value;
        if (memoryCache[key]) return memoryCache[key];
        try {
            value = Lampa && Lampa.Storage ? Lampa.Storage.get(CACHE_PREFIX + key, false) : false;
            if (typeof value === 'string') value = JSON.parse(value);
            if (value && value.saved && value.items) {
                memoryCache[key] = value;
                return value;
            }
        } catch (error) {}
        return false;
    }

    function cacheStorageSet(key, data) {
        var envelope = {
            saved: now(),
            page: data.page || 1,
            total_pages: data.total_pages || 1,
            items: []
        };
        var i;
        for (i = 0; i < (data.results || []).length; i++) {
            envelope.items.push(compactCard(data.results[i]));
        }
        memoryCache[key] = envelope;
        try {
            if (Lampa && Lampa.Storage) {
                Lampa.Storage.set(CACHE_PREFIX + key, envelope);
                updateCacheIndex(key, envelope.saved);
            }
        } catch (error) {}
    }

    function updateCacheIndex(key, saved) {
        var index = Lampa.Storage.get(CACHE_INDEX, []);
        var clean = [];
        var removed;
        var i;
        if (typeof index === 'string') {
            try {
                index = JSON.parse(index);
            } catch (error) {
                index = [];
            }
        }
        if (!index || typeof index.length === 'undefined') index = [];
        for (i = 0; i < index.length; i++) {
            if (index[i] && index[i].key !== key) clean.push(index[i]);
        }
        clean.push({ key: key, saved: saved });
        clean.sort(function (left, right) {
            return intValue(right.saved, 0) - intValue(left.saved, 0);
        });
        while (clean.length > CACHE_MAX_ENTRIES) {
            removed = clean.pop();
            if (removed && removed.key) {
                delete memoryCache[removed.key];
                Lampa.Storage.set(CACHE_PREFIX + removed.key, false);
            }
        }
        Lampa.Storage.set(CACHE_INDEX, clean);
    }

    function cachedResponse(envelope) {
        return {
            page: envelope.page || 1,
            total_pages: envelope.total_pages || 1,
            results: envelope.items || [],
            compact_cached: true
        };
    }

    function finishTask() {
        active -= 1;
        if (active < 0) active = 0;
        pumpQueue();
    }

    function runTask(task) {
        var RequestClass;
        var request;
        var timer;
        var finished = false;

        function done(ok, value) {
            if (finished) return;
            finished = true;
            clearTimeout(timer);
            finishTask();
            if (ok) task.success(value || {});
            else task.error(value || { message: 'network' });
        }

        active += 1;
        timer = setTimeout(function () {
            try {
                if (request && request.clear) request.clear();
            } catch (error) {}
            done(false, { message: 'timeout', timeout: true });
        }, task.timeout || REQUEST_TIMEOUT);

        try {
            RequestClass = Lampa.Request || Lampa.Reguest;
            if (!RequestClass) throw new Error('Lampa request API is unavailable');
            request = new RequestClass();
            if (request.timeout) request.timeout(task.timeout || REQUEST_TIMEOUT);
            request.silent(Lampa.TMDB.api(task.path), function (json) {
                done(true, json);
            }, function (error) {
                done(false, error);
            });
        } catch (error) {
            done(false, error);
        }
    }

    function pumpQueue() {
        var task;
        while (active < MAX_ACTIVE && queue.length) {
            task = queue.shift();
            runTask(task);
        }
    }

    function enqueue(path, success, error, timeout) {
        queue.push({
            path: path,
            success: success || noop,
            error: error || noop,
            timeout: timeout || REQUEST_TIMEOUT
        });
        pumpQueue();
    }

    function mediaSort(type, sortId) {
        var list = type === 'tv' ? TV_SORTS : MOVIE_SORTS;
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === sortId) return list[i].key;
        }
        return list[0].key;
    }

    function baseDiscover(type, page, sortId) {
        var params = {
            language: 'ru-RU',
            include_adult: 'false',
            include_video: 'false',
            page: page || 1,
            sort_by: mediaSort(type, sortId || 'popular'),
            'vote_count.gte': intValue(setting('compact_min_votes'), 150)
        };
        if (type === 'movie') params.region = 'RU';
        return params;
    }

    function routeParts(route) {
        var parts = stringValue(route).split(':');
        return {
            group: parts[1] || '',
            type: parts[2] || '',
            value: parts[3] || '',
            sort: parts[4] || 'popular',
            region: parts[5] || 'RU'
        };
    }

    function requestPlans(route, page, fallback) {
        var routeData = routeParts(route);
        var plans = [];
        var types = routeData.type === 'all' ? ['movie', 'tv'] : [routeData.type || 'movie'];
        var i;
        var type;
        var params;
        var endpoint;
        var minVotes;
        for (i = 0; i < types.length; i++) {
            type = types[i];
            params = baseDiscover(type, page, routeData.sort);
            endpoint = 'discover/' + type;
            if (fallback) {
                minVotes = intValue(params['vote_count.gte'], 150);
                params['vote_count.gte'] = Math.max(10, Math.floor(minVotes / 2));
            }
            if (routeData.group === 'trend') {
                endpoint = 'trending/' + type + '/week';
                params = { language: 'ru-RU', page: page || 1 };
            } else if (routeData.group === 'provider') {
                params.watch_region = routeData.region;
                params.with_watch_monetization_types = 'flatrate|free|ads';
                params.with_watch_providers = routeData.value;
            } else if (routeData.group === 'genre') {
                params.with_genres = routeData.value;
            } else if (routeData.group === 'new') {
                if (type === 'movie') {
                    params['primary_release_date.gte'] = daysAgo(150);
                    params['primary_release_date.lte'] = daysAhead(21);
                } else {
                    params['first_air_date.gte'] = daysAgo(150);
                    params['first_air_date.lte'] = daysAhead(21);
                }
            } else if (routeData.group === 'russian') {
                params.with_origin_country = 'RU';
                params.with_original_language = 'ru';
                if (type === 'movie') params['primary_release_date.gte'] = daysAgo(730);
                else params['first_air_date.gte'] = daysAgo(730);
            } else if (routeData.group === 'kids') {
                params.with_genres = type === 'movie' ? '16|10751' : '16|10751|10762';
                params.without_genres = '27,53,80';
                params['vote_count.gte'] = fallback ? 10 : Math.min(50, intValue(setting('compact_min_votes'), 150));
            } else if (routeData.group === 'quality') {
                params['vote_average.gte'] = fallback ? 6 : 6.7;
                params['vote_average.lte'] = 10;
                if (type === 'movie') params['primary_release_date.gte'] = daysAgo(500);
                else params['first_air_date.gte'] = daysAgo(500);
            } else if (routeData.group === 'theme') {
                applyTheme(params, type, routeData.value, fallback);
            }
            plans.push({
                type: type,
                path: endpoint + '?' + encodeQuery(params)
            });
        }
        return plans;
    }

    function applyTheme(params, type, value, fallback) {
        var currentYear = new Date().getFullYear();
        if (value === 'retro') {
            if (type === 'movie') {
                params['primary_release_date.gte'] = (currentYear - 35) + '-01-01';
                params['primary_release_date.lte'] = (currentYear - 20) + '-12-31';
            } else {
                params['first_air_date.gte'] = (currentYear - 30) + '-01-01';
                params['first_air_date.lte'] = (currentYear - 15) + '-12-31';
            }
        } else if (value === 'space') {
            params.with_genres = type === 'movie' ? '878|12' : '10765|10759';
        } else if (value === 'crime') {
            params.with_genres = type === 'movie' ? '80|9648' : '80|9648';
        } else if (value === 'family') {
            params.with_genres = type === 'movie' ? '10751|16' : '10751|16';
        } else {
            params.with_genres = type === 'movie' ? '12|14' : '10759|10765';
        }
        if (!fallback) params['vote_average.gte'] = 6.2;
    }

    function performPlans(plans, relaxed, callback) {
        var pending = plans.length;
        var results = [];
        var maxPages = 1;
        var succeeded = false;
        var i;
        if (!pending) {
            callback(false, { results: [], page: 1, total_pages: 1 });
            return;
        }

        function settle(ok, json, type) {
            var filtered;
            if (ok && json && json.results) {
                succeeded = true;
                filtered = filterItems(json.results, type, relaxed);
                results = mergeUnique(results, filtered);
                maxPages = Math.max(maxPages, intValue(json.total_pages, 1));
            }
            pending -= 1;
            if (!pending) {
                callback(succeeded, {
                    page: plans.length ? intValue(routePageFromPath(plans[0].path), 1) : 1,
                    total_pages: maxPages,
                    results: results
                });
            }
        }

        for (i = 0; i < plans.length; i++) {
            (function (plan) {
                enqueue(plan.path, function (json) {
                    settle(true, json, plan.type);
                }, function () {
                    settle(false, null, plan.type);
                });
            }(plans[i]));
        }
    }

    function routePageFromPath(path) {
        var match = /(?:\?|&)page=([^&]+)/.exec(path);
        return match ? match[1] : '1';
    }

    function cacheKey(route, page) {
        return encodeURIComponent(route).replace(/%/g, '_') + '_p' + (page || 1) +
            '_v' + intValue(setting('compact_min_votes'), 150) +
            '_c' + (boolValue(setting('compact_cyrillic'), false) ? 1 : 0) +
            '_a' + stringValue(setting('compact_age'));
    }

    function fetchRoute(route, page, callback, options) {
        var opts = options || {};
        var key = cacheKey(route, page);
        var cached = cacheStorageGet(key);
        var age = cached ? now() - cached.saved : Number.MAX_VALUE;
        var delivered = false;

        function deliver(data, meta) {
            if (delivered && !opts.backgroundCallback) return;
            if (!delivered) delivered = true;
            callback(data, meta || {});
        }

        function release(data, meta) {
            var waiting = refreshLocks[key] || [];
            var i;
            delete refreshLocks[key];
            if (!delivered || opts.backgroundCallback) deliver(data, meta);
            for (i = 0; i < waiting.length; i++) waiting[i](data, meta);
        }

        function request(fallback) {
            var plans;
            plans = requestPlans(route, page, fallback);
            performPlans(plans, fallback, function (ok, data) {
                if ((!ok || !data.results.length) && !fallback) {
                    request(true);
                    return;
                }
                if (data.results.length) {
                    cacheStorageSet(key, data);
                    release(data, { refreshed: true });
                } else {
                    release(cached ? cachedResponse(cached) : data, { failed: true });
                }
            });
        }

        if (cached && age <= CACHE_LIFE) {
            deliver(cachedResponse(cached), { freshCache: true });
            return;
        }
        if (cached && age <= CACHE_STALE) {
            deliver(cachedResponse(cached), { staleCache: true });
            if (refreshLocks[key]) return;
            refreshLocks[key] = [];
            request(false);
            return;
        }
        if (refreshLocks[key]) {
            refreshLocks[key].push(callback);
            return;
        }
        refreshLocks[key] = [];
        request(false);
    }

    function addSourceMark(data) {
        var i;
        if (!data || !data.results) return data;
        for (i = 0; i < data.results.length; i++) data.results[i].source = 'tmdb';
        return data;
    }

    function openCategory(route, title) {
        Lampa.Activity.push({
            url: route,
            title: title,
            component: 'category_full',
            source: SOURCE,
            page: 1
        });
    }

    function sortMenu(type, providerId, providerTitle, region) {
        var items = [];
        var types;
        var i;
        if (!Lampa.Select || !Lampa.Select.show) {
            openCategory('compact:provider:all:' + providerId + ':popular:' + region, providerTitle);
            return;
        }
        types = [
            { title: 'Фильмы — популярные', media: 'movie', sort: 'popular' },
            { title: 'Фильмы — по рейтингу', media: 'movie', sort: 'rating' },
            { title: 'Фильмы — сначала новые', media: 'movie', sort: 'new' },
            { title: 'Фильмы — по сборам', media: 'movie', sort: 'revenue' },
            { title: 'Сериалы — популярные', media: 'tv', sort: 'popular' },
            { title: 'Сериалы — по рейтингу', media: 'tv', sort: 'rating' },
            { title: 'Сериалы — сначала новые', media: 'tv', sort: 'new' }
        ];
        for (i = 0; i < types.length; i++) items.push(types[i]);
        Lampa.Select.show({
            title: providerTitle + ': сортировка',
            items: items,
            onSelect: function (choice) {
                if (Lampa.Select.close) Lampa.Select.close();
                openCategory('compact:provider:' + choice.media + ':' + providerId + ':' + choice.sort + ':' + region,
                    providerTitle + ' — ' + choice.title.toLowerCase());
            },
            onBack: function () {
                if (Lampa.Controller && Lampa.Controller.toggle) Lampa.Controller.toggle('content');
            }
        });
    }

    function openNavigation(data) {
        var route = data.compact_route || '';
        var parts = routeParts(route);
        if (parts.group === 'provider') {
            sortMenu(parts.type, parts.value, data.title || data.name, parts.region);
        } else {
            openCategory(route, data.title || data.name || 'Compact');
        }
    }

    function addMoreAction(data, route, title) {
        if (!data) data = { results: [] };
        if (!data.params) data.params = {};
        if (!data.params.emit) data.params.emit = {};
        data.params.emit.onlyMore = function () {
            openCategory(route, title || 'Compact');
        };
        return data;
    }

    function addStaticRow(index, name, enabledSetting, title, maker) {
        if (!settingOn(enabledSetting)) return;
        Lampa.ContentRows.add({
            name: name,
            title: title,
            index: index,
            screen: ['main'],
            call: function () {
                return function (call) {
                    call(maker());
                };
            }
        });
    }

    function addNetworkRow(index, name, enabledSetting, title, route) {
        if (!settingOn(enabledSetting)) return;
        Lampa.ContentRows.add({
            name: name,
            title: title,
            index: index,
            screen: ['main'],
            call: function () {
                return function (call) {
                    fetchRoute(route, 1, function (data) {
                        data = addSourceMark(data || { results: [] });
                        data.title = title;
                        data.compact_route = route;
                        if (data.results.length > HOME_LIMIT) data.results = data.results.slice(0, HOME_LIMIT);
                        call(addMoreAction(data, route, title));
                    });
                };
            }
        });
    }

    function makeMainNavigation() {
        return {
            title: '',
            page: 1,
            total_pages: 1,
            params: actionRowParams(),
            results: [
                navigationCard(1, 'Новинки', '#295c82', 'compact:new:all:recent:new', 'Фильмы и сериалы'),
                navigationCard(2, 'Русское', '#8a3f34', 'compact:russian:all:ru:new', 'Новые фильмы и сериалы'),
                navigationCard(3, 'Детское', '#3b7c58', 'compact:kids:all:family:popular', 'Бережный фильтр')
            ]
        };
    }

    function makeProviderRow(title, providers, offset) {
        var results = [];
        var i;
        for (i = 0; i < providers.length; i++) {
            results.push(navigationCard(offset + i, providers[i].title, providers[i].color,
                'compact:provider:all:' + providers[i].id + ':popular:' + providers[i].region,
                'Доступность: JustWatch', providers[i].logo));
        }
        return { title: title, page: 1, total_pages: 1, results: results, params: actionRowParams() };
    }

    function makeGenreRow() {
        var results = [];
        var i;
        for (i = 0; i < MOVIE_GENRES.length; i++) {
            results.push(navigationCard(300 + i, MOVIE_GENRES[i].title + ' · кино', MOVIE_GENRES[i].color,
                'compact:genre:movie:' + MOVIE_GENRES[i].id + ':popular', 'Жанр фильмов'));
        }
        for (i = 0; i < TV_GENRES.length; i++) {
            results.push(navigationCard(400 + i, TV_GENRES[i].title + ' · ТВ', TV_GENRES[i].color,
                'compact:genre:tv:' + TV_GENRES[i].id + ':popular', 'Жанр сериалов'));
        }
        return {
            title: 'Жанры',
            page: 1,
            total_pages: 1,
            results: results,
            params: actionRowParams()
        };
    }

    function currentTheme() {
        var themes = [
            { id: 'adventure', title: 'Приключения с высоким рейтингом' },
            { id: 'space', title: 'Космос и фантастика' },
            { id: 'crime', title: 'Криминал и расследования' },
            { id: 'family', title: 'Для семейного вечера' },
            { id: 'retro', title: 'Проверено временем' }
        ];
        var week = Math.floor(now() / (7 * 24 * 60 * 60 * 1000));
        return themes[week % themes.length];
    }

    function registerRows() {
        var theme;
        if (!Lampa.ContentRows || !Lampa.ContentRows.add) return;
        addStaticRow(10, 'compact_navigation', 'compact_navigation', 'Разделы', makeMainNavigation);
        addStaticRow(20, 'compact_global', 'compact_global', 'Мировые сервисы · JustWatch', function () {
            return makeProviderRow('Мировые сервисы · JustWatch', GLOBAL_PROVIDERS, 100);
        });
        addStaticRow(30, 'compact_genres', 'compact_genres', 'Жанры', makeGenreRow);
        addStaticRow(40, 'compact_russian', 'compact_russian', 'Российские сервисы · JustWatch', function () {
            return makeProviderRow('Российские сервисы · JustWatch', RUSSIAN_PROVIDERS, 200);
        });
        addNetworkRow(50, 'compact_trend_movie', 'compact_trend_movie',
            'Тренды недели — фильмы', 'compact:trend:movie:week:popular');
        addNetworkRow(60, 'compact_trend_tv', 'compact_trend_tv',
            'Тренды недели — сериалы', 'compact:trend:tv:week:popular');
        addNetworkRow(70, 'compact_quality', 'compact_quality',
            'Качественные новинки', 'compact:quality:all:recent:rating');
        theme = currentTheme();
        addNetworkRow(80, 'compact_theme', 'compact_theme', theme.title,
            'compact:theme:all:' + theme.id + ':popular');
    }

    function sourceCategory(params, onComplete, onError) {
        var route = params.url || params.route || 'compact:trend:movie:week:popular';
        var page = intValue(params.page, 1);
        fetchRoute(route, page, function (data, meta) {
            data = addSourceMark(data || { results: [] });
            data.page = page;
            if (!data.results.length && meta && meta.failed && onError) onError();
            else onComplete(data);
        });
    }

    function registerSource() {
        var source;
        if (!Lampa.Api) return;
        if (!Lampa.Api.sources) Lampa.Api.sources = {};
        source = {
            title: 'Compact',
            main: function (params, onComplete, onError) {
                sourceCategory({ url: 'compact:trend:movie:week:popular', page: params.page || 1 },
                    onComplete, onError);
            },
            category: sourceCategory,
            list: sourceCategory,
            clear: function () {},
            cancel: function () {}
        };
        Lampa.Api.sources[SOURCE] = source;
    }

    function addSettingParam(name, type, title, description, values, defaultValue) {
        var param = {
            name: name,
            type: type,
            'default': defaultValue
        };
        if (values) param.values = values;
        Lampa.SettingsApi.addParam({
            component: 'compact',
            param: param,
            field: {
                name: title,
                description: description
            },
            onChange: function (value) {
                try {
                    Lampa.Storage.set(name, value);
                } catch (error) {}
            }
        });
    }

    function registerSettings() {
        if (!Lampa.SettingsApi || !Lampa.SettingsApi.addComponent || !Lampa.SettingsApi.addParam) return;
        Lampa.SettingsApi.addComponent({
            component: 'compact',
            name: 'Compact',
            icon: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M4 5h16v4H4V5m0 5h10v4H4v-4m0 5h13v4H4v-4z"/></svg>'
        });
        addSettingParam('compact_enabled', 'trigger', 'Включить Compact',
            'Главный выключатель. После изменения перезапустите Lampa.', null, true);
        addSettingParam('compact_navigation', 'trigger', 'Разделы',
            'Новинки, Русское и Детское.', null, true);
        addSettingParam('compact_global', 'trigger', 'Мировые сервисы',
            'Логотипы глобальных стримингов.', null, true);
        addSettingParam('compact_russian', 'trigger', 'Российские сервисы',
            'Логотипы российских стримингов.', null, true);
        addSettingParam('compact_genres', 'trigger', 'Жанры',
            'Раздельные жанры фильмов и сериалов.', null, true);
        addSettingParam('compact_trend_movie', 'trigger', 'Тренды — фильмы',
            'Первый сетевой ряд.', null, true);
        addSettingParam('compact_trend_tv', 'trigger', 'Тренды — сериалы',
            'Второй сетевой ряд.', null, true);
        addSettingParam('compact_quality', 'trigger', 'Качественные новинки',
            'Недавние релизы с хорошей оценкой.', null, true);
        addSettingParam('compact_theme', 'trigger', 'Тема недели',
            'Один автоматически сменяемый ряд.', null, true);
        addSettingParam('compact_min_votes', 'select', 'Минимум оценок',
            'Меньше значение — больше редких карточек.', {
                '25': '25', '50': '50', '100': '100', '150': '150', '300': '300', '500': '500'
            }, '150');
        addSettingParam('compact_cyrillic', 'trigger', 'Только с русским описанием',
            'Требовать кириллицу в названии или описании.', null, false);
        addSettingParam('compact_age', 'select', 'Возрастной режим',
            'Эвристический фильтр по adult и жанрам.', {
                '0': '0+', '6': '6+', '12': '12+', '16': '16+', '18': '18+', 'off': 'Не фильтровать'
            }, '16');
    }

    function hasRequiredApi() {
        return !!(Lampa.Storage && Lampa.Storage.get && Lampa.Storage.set &&
            Lampa.TMDB && Lampa.TMDB.api &&
            Lampa.Api &&
            Lampa.Maker && Lampa.Maker.make &&
            Lampa.ContentRows && Lampa.ContentRows.add &&
            Lampa.Activity && Lampa.Activity.push &&
            (Lampa.Request || Lampa.Reguest));
    }

    function disableShots() {
        try {
            Lampa.Storage.set('content_rows_shots_main', 'false');
        } catch (error) {}
    }

    function start() {
        if (started || !window.Lampa) return;
        Lampa = window.Lampa;
        if (!hasRequiredApi()) {
            try {
                if (Lampa.Noty && Lampa.Noty.show) {
                    Lampa.Noty.show('Compact: эта версия Lampa не поддерживается');
                }
            } catch (error) {}
            return;
        }
        started = true;
        disableShots();
        injectCompactStyles();
        registerSettings();
        registerSource();
        if (settingOn('compact_enabled')) registerRows();
        try {
            if (Lampa.Noty && Lampa.Noty.show) Lampa.Noty.show('Compact ' + VERSION + ' готов');
        } catch (error) {}
    }

    window.LampaCompact = {
        version: VERSION,
        start: start,
        open: openCategory,
        clearMemoryCache: function () {
            memoryCache = {};
        },
        __test: {
            filterItems: filterItems,
            requestPlans: requestPlans,
            routeParts: routeParts,
            mergeUnique: mergeUnique,
            cacheKey: cacheKey,
            fetchRoute: fetchRoute,
            queueState: function () {
                return { active: active, queued: queue.length, max: MAX_ACTIVE };
            },
            constants: {
                timeout: REQUEST_TIMEOUT,
                cacheLife: CACHE_LIFE,
                cacheStale: CACHE_STALE,
                cacheMaxEntries: CACHE_MAX_ENTRIES
            },
            reset: function () {
                queue = [];
                active = 0;
                memoryCache = {};
                refreshLocks = {};
            }
        }
    };

    if (window.appready) start();
    else if (window.Lampa && window.Lampa.Listener && window.Lampa.Listener.follow) {
        window.Lampa.Listener.follow('app', function (event) {
            if (event && event.type === 'ready') start();
        });
    }
}(window));
