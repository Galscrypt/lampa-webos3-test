(function () {
    'use strict';
    if (!Array.prototype.includes) {
        Array.prototype.includes = function (item, from) {
            var length = this.length >>> 0;
            var index = from | 0;
            if (index < 0) index = Math.max(length + index, 0);
            for (; index < length; index++) {
                if (this[index] === item || (this[index] !== this[index] && item !== item)) return true;
            }
            return false;
        };
    }
    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            return String(this).indexOf(String(search), start || 0) !== -1;
        };
    }
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (search, start) {
            var position = start > 0 ? Math.floor(start) : 0;
            search = String(search);
            return String(this).slice(position, position + search.length) === search;
        };
    }
    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate, thisArg) {
            if (this == null) throw new TypeError('Array.prototype.find called on null or undefined');
            if (typeof predicate !== 'function') throw new TypeError('predicate must be a function');
            var list = Object(this);
            var length = list.length >>> 0;
            for (var i = 0; i < length; i++) {
                var value = list[i];
                if (predicate.call(thisArg, value, i, list)) return value;
            }
        };
    }
})();

(function () {
  'use strict';

  // Опции сортировки  
  var allSortOptions = [{
    id: 'vote_count.desc',
    title: 'surs_vote_count_desc'
  }, {
    id: 'vote_average.desc',
    title: 'surs_vote_average_desc'
  }, {
    id: 'first_air_date.desc',
    title: 'surs_first_air_date_desc'
  }, {
    id: 'popularity.desc',
    title: 'surs_popularity_desc'
  }, {
    id: 'revenue.desc',
    title: 'surs_revenue_desc'
  }];

  // Жанры фильмов  
  var allGenres = [{
    id: 28,
    title: 'surs_genre_action'
  }, {
    id: 35,
    title: 'surs_genre_comedy'
  }, {
    id: 18,
    title: 'surs_genre_drama'
  }, {
    id: 10749,
    title: 'surs_genre_romance'
  }, {
    id: 16,
    title: 'surs_genre_animation'
  }, {
    id: 10762,
    title: 'surs_genre_kids'
  }, {
    id: 12,
    title: 'surs_genre_adventure'
  }, {
    id: 80,
    title: 'surs_genre_crime'
  }, {
    id: 9648,
    title: 'surs_genre_mystery'
  }, {
    id: 878,
    title: 'surs_genre_sci_fi'
  }, {
    id: 37,
    title: 'surs_genre_western'
  }, {
    id: 53,
    title: 'surs_genre_thriller'
  }, {
    id: 10751,
    title: 'surs_genre_family'
  }, {
    id: 14,
    title: 'surs_genre_fantasy'
  }, {
    id: 10764,
    title: 'surs_genre_reality'
  }, {
    id: 10759,
    title: 'surs_genre_action_adventure'
  }, {
    id: 10766,
    title: 'surs_genre_soap'
  }, {
    id: 10767,
    title: 'surs_genre_talk_show'
  }];

  // Стриминговые сервисы  
  var allStreamingServices = [{
    id: 49,
    title: 'HBO'
  }, {
    id: 77,
    title: 'SyFy'
  }, {
    id: 2552,
    title: 'Apple TV+'
  }, {
    id: 453,
    title: 'Hulu'
  }, {
    id: 1024,
    title: 'Amazon Prime'
  }, {
    id: 213,
    title: 'Netflix'
  }, {
    id: 3186,
    title: 'HBO Max'
  }, {
    id: 2076,
    title: 'Paramount network'
  }, {
    id: 4330,
    title: 'Paramount+'
  }, {
    id: 3353,
    title: 'Peacock'
  }, {
    id: 2739,
    title: 'Disney+'
  }, {
    id: 2,
    title: 'ABC'
  }, {
    id: 6,
    title: 'NBC'
  }, {
    id: 16,
    title: 'CBS'
  }, {
    id: 318,
    title: 'Starz'
  }, {
    id: 174,
    title: 'AMC'
  }, {
    id: 19,
    title: 'FOX'
  }, {
    id: 64,
    title: 'Discovery'
  }, {
    id: 1778,
    title: 'test'
  }, {
    id: 493,
    title: 'BBC America'
  }, {
    id: 88,
    title: 'FX'
  }, {
    id: 67,
    title: 'Showtime'
  }];
  var allStreamingServicesRUS = [{
    id: 2493,
    title: 'Start'
  }, {
    id: 2859,
    title: 'Premier'
  }, {
    id: 4085,
    title: 'KION'
  }, {
    id: 3923,
    title: 'ИВИ'
  }, {
    id: 412,
    title: 'Россия 1'
  }, {
    id: 558,
    title: 'Первый канал'
  }, {
    id: 3871,
    title: 'Okko'
  }, {
    id: 3827,
    title: 'Кинопоиск'
  }, {
    id: 5806,
    title: 'Wink'
  }, {
    id: 806,
    title: 'СТС'
  }, {
    id: 1191,
    title: 'ТНТ'
  }, {
    id: 1119,
    title: 'НТВ'
  }, {
    id: 3031,
    title: 'Пятница'
  }, {
    id: 3882,
    title: 'More.TV'
  }];

  /* 
   * Периоды для случайного выбора 
   */
  var periods = [{
    start: 1970,
    end: 1974
  }, {
    start: 1975,
    end: 1979
  }, {
    start: 1980,
    end: 1984
  }, {
    start: 1985,
    end: 1989
  }, {
    start: 1990,
    end: 1994
  }, {
    start: 1995,
    end: 1999
  }, {
    start: 2000,
    end: 2004
  }, {
    start: 2005,
    end: 2009
  }, {
    start: 2010,
    end: 2014
  }, {
    start: 2015,
    end: 2019
  }, {
    start: 2020,
    end: 2025
  }];

  /* 
   * Получает случайный период из массива periods 
   */
  function getRandomPeriod() {
    var index = Math.floor(Math.random() * periods.length);
    return periods[index];
  }

  /* 
   * Функция получения всех настроек 
   */
  function getAllStoredSettings() {
    return Lampa.Storage.get('surs_settings') || {};
  }

  /* 
   * Функция получения настроек текущего пользователя 
   */
  function getProfileSettings() {
    var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';
    var allSettings = getAllStoredSettings();
    if (!allSettings.hasOwnProperty(profileId)) {
      allSettings[profileId] = {};
      saveAllStoredSettings(allSettings);
    }
    return allSettings[profileId];
  }

  /* 
   * Функция сохранения всех настроек 
   */
  function saveAllStoredSettings(settings) {
    Lampa.Storage.set('surs_settings', settings);
  }

  /* 
   * Функция получения конкретного сохраненного значения (по умолчанию true) 
   */
  function getStoredSetting(key, defaultValue) {
    var profileSettings = getProfileSettings();
    return profileSettings.hasOwnProperty(key) ? profileSettings[key] : defaultValue;
  }

  /* 
   * Функция сохранения отдельного значения 
   */
  function setStoredSetting(key, value) {
    var allSettings = getAllStoredSettings();
    var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';
    if (!allSettings.hasOwnProperty(profileId)) {
      allSettings[profileId] = {};
    }
    allSettings[profileId][key] = value;
    saveAllStoredSettings(allSettings);
  }

  /* 
   * Функция фильтрации включенных элементов 
   */
  function getEnabledItems(allItems, storageKeyPrefix) {
    var result = [];
    for (var i = 0; i < allItems.length; i++) {
      if (getStoredSetting(storageKeyPrefix + allItems[i].id, true)) {
        result.push(allItems[i]);
      }
    }
    return result;
  }

  /* 
   * Получает опции сортировки 
   */
  function getSortOptions() {
    return getEnabledItems(allSortOptions, 'sort_');
  }

  /* 
   * Получает жанры 
   */
  function getGenres() {
    return getEnabledItems(allGenres, 'genre_');
  }

  /* 
   * Получает стриминговые сервисы 
   */
  function getStreamingServices() {
    return getEnabledItems(allStreamingServices, 'streaming_');
  }

  /* 
   * Получает русские стриминговые сервисы 
   */
  function getStreamingServicesRUS() {
    return getEnabledItems(allStreamingServicesRUS, 'streaming_rus_');
  }
  if (!getStoredSetting('interface_size_initialized', false)) {
    Lampa.Storage.set("interface_size", "small");
    setStoredSetting('interface_size_initialized', true);
  }

  /* 
   * Глобальные функции фильтрации 
   */
  function filterCyrillic(items) {
    var language = Lampa.Storage.get('language');
    if (language !== 'ru' && language !== 'uk') {
      return items;
    }
    var storedValue = Lampa.Storage.get('cirillic');
    var isFilterEnabled = storedValue === '1' || storedValue === null || storedValue === undefined || storedValue === '';
    if (!isFilterEnabled) {
      return items;
    }

    /* 
     * Проверяет наличие кириллицы в значении 
     */
    function containsCyrillic(value) {
      if (typeof value === 'string') {
        return /[а-яА-ЯёЁїЇіІєЄґҐ]/.test(value);
      } else if (typeof value === 'object' && value !== null) {
        var keys = Object.keys(value);
        for (var i = 0; i < keys.length; i++) {
          if (containsCyrillic(value[keys[i]])) {
            return true;
          }
        }
      }
      return false;
    }
    var filteredItems = items.filter(function (item) {
      return containsCyrillic(item);
    });
    return filteredItems;
  }

  /* 
   * Применяет фильтры к элементам 
   */
  function applyFilters(items) {
    items = filterCyrillic(items);
    return items;
  }

  /* 
   * Применяет минимальное количество голосов к URL 
   */
  function applyMinVotes(baseUrl) {
    var minVotes = getStoredSetting('minVotes');
    minVotes = parseInt(minVotes, 10);
    if (isNaN(minVotes)) {
      minVotes = 10;
    }
    if (minVotes > 0) {
      baseUrl += '&vote_count.gte=' + minVotes;
    }
    return baseUrl;
  }

  /* 
   * Применяет возрастные ограничения к URL 
   */
  function applyAgeRestriction(baseUrl) {
    var ageRestriction = getStoredSetting('ageRestrictions');
    if (ageRestriction && String(ageRestriction).trim() !== '') {
      var certificationMap = {
        '0+': '0+',
        '6+': '6+',
        '12+': '12+',
        '16+': '16+',
        '18+': '18+'
      };
      if (certificationMap.hasOwnProperty(ageRestriction)) {
        baseUrl += '&certification_country=RU&certification=' + encodeURIComponent(certificationMap[ageRestriction]);
      }
    }
    return baseUrl;
  }

  /* 
   * Применяет исключение ключевых слов к URL 
   */
  function applyWithoutKeywords(baseUrl) {
    var filterLevel = getStoredSetting('withoutKeywords');
    var baseExcludedKeywords = ['346488', '158718', '41278'];
    if (!filterLevel || filterLevel == '1') {
      baseExcludedKeywords.push('13141', '345822', '315535', '290667', '323477', '290609');
    }
    if (filterLevel == '2') {
      baseExcludedKeywords.push('210024', '13141', '345822', '315535', '290667', '323477', '290609');
    }
    baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));
    return baseUrl;
  }

  /* 
   * Собирает полный API URL с фильтрами 
   */
  function buildApiUrl(baseUrl) {
    baseUrl = applyMinVotes(baseUrl);
    baseUrl = applyAgeRestriction(baseUrl);
    baseUrl = applyWithoutKeywords(baseUrl);
    return baseUrl;
  }

  /* 
   * Корректирует сортировку для фильмов, добавляет фильтры по датам (не старше 8 месяцев, до 10 дней назад) 
   */
  function adjustSortForMovies(sort) {
    if (sort.id === 'first_air_date.desc') {
      sort = {
        id: 'release_date.desc',
        title: 'surs_first_air_date_desc'
      };
    }
    if (sort.id === 'release_date.desc') {
      var endDate = new Date();
      endDate.setDate(endDate.getDate() - 40);
      endDate = endDate.toISOString().split('T')[0];
      var startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 26);
      startDate = startDate.toISOString().split('T')[0];
      sort.extraParams = '&release_date.gte=' + startDate + '&release_date.lte=' + endDate;
    }
    return sort;
  }

  /* 
   * Корректирует сортировку для сериалов, добавляет фильтры по датам (не старше 8 месяцев, до 10 дней назад) 
   */
  function adjustSortForTVShows(sort) {
    if (sort.id === 'first_air_date.desc') {
      var endDate = new Date();
      endDate.setDate(endDate.getDate() - 10);
      endDate = endDate.toISOString().split('T')[0];
      var startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 18);
      startDate = startDate.toISOString().split('T')[0];
      sort.extraParams = '&first_air_date.gte=' + startDate + '&first_air_date.lte=' + endDate;
    }
    return sort;
  }

  /* 
   * Генерирует случайный флаг для широкого просмотра 
   */
  function randomWideFlag() {
    return Math.random() < 0.1;
  }

  /* 
   * Обертка для добавления флага широкого просмотра к запросу 
   */
  function wrapWithWideFlag(requestFunc) {
    return function (callback) {
      requestFunc(function (json) {
        json = Lampa.Utils.addSource(json, 'tmdb');
        if (randomWideFlag()) {
          if (Array.isArray(json.results)) {
            json.results.forEach(function (c) {
              c.promo = c.overview || '';
              c.promo_title = c.title || c.name || Lampa.Lang.translate('surs_noname');
              c.params = {
                style: {
                  name: 'wide'
                }
              };
            });
          }
          json.params = {
            items: {
              view: 3
            }
          };
        }
        callback(json);
      });
    };
  }

  /* 
   * Перемешивает массив случайным образом 
   */
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  /* 
   * Получает все кнопки 
   */
  function getAllButtons() {
    if (typeof window.surs_getAllButtons === 'function') {
      return window.surs_getAllButtons();
    }
    return [];
  }

  /* 
   * Добавляет строку пользовательских кнопок 
   */
  function addCustomButtonsRow(partsData) {
    if (window.surs_getCustomButtonsRow) {
      window.surs_getCustomButtonsRow(partsData);
    }
  }

  /* 
   * Получает данные частей 
   */
  function getPartsData() {
    var partsData = [];
    addCustomButtonsRow(partsData);
    return partsData;
  }

  /* * Обертки для вставки строк стримингов в combinedData */
  function makeStreamingRowWrapper(getRowFn) {
    return function () {
      var data = [];
      getRowFn(data);
      return data[0] || function (cb) {
        cb({
          results: []
        });
      };
    };
  }
  /* 
   * Получает предстоящие эпизоды 
   */
  function getUpcomingEpisodes() {
    return function (cb) {
      var lately = Lampa.TimeTable.lately().slice(0, 20);
      lately.forEach(function (item) {
        item.params = {
          createInstance: function (item_data) {
            return Lampa.Maker.make('Episode', item_data, function (module) {
              return module.only('Card', 'Callback');
            });
          },
          emit: {
            onlyEnter: function () {
              Lampa.Router.call('full', item.card);
            },
            onlyFocus: function () {
              Lampa.Background.change(Lampa.Utils.cardImgBackgroundBlur(item.card));
            }
          }
        };
        Lampa.Arrays.extend(item, item.episode);
      });
      cb({
        results: lately,
        title: Lampa.Lang.translate('surs_title_upcoming_episodes')
      });
    };
  }
  function startPlugin() {
    window.plugin_surs_ready = true;
    var SourceTMDB = function (parent) {
      this.network = new Lampa.Reguest();
      this.discovery = false;
      this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var onComplete = arguments.length > 1 ? arguments[1] : undefined;
        var onError = arguments.length > 2 ? arguments[2] : undefined;
        var partsLimit = 4;
        var partsData = getPartsData();
        var CustomData = [];
        var trendingsData = [];
        var globalStreamingRow = null;
        var russianStreamingRow = null;
        if (typeof window.streaming_getGlobalStreamingRow === 'function') {
          globalStreamingRow = makeStreamingRowWrapper(window.streaming_getGlobalStreamingRow);
        }
        if (typeof window.streaming_getRussianStreamingRow === 'function') {
          russianStreamingRow = makeStreamingRowWrapper(window.streaming_getRussianStreamingRow);
        }

        // Добавляем жанровые ряды  
        var genresRow = null;
        if (typeof window.genres_createGenresRow === 'function') {
          genresRow = makeStreamingRowWrapper(window.genres_createGenresRow);
        }
        var trendingMovies = function (callback) {
          var baseUrl = 'trending/movie/week';
          baseUrl = applyAgeRestriction(baseUrl);
          owner.get(baseUrl, params, function (json) {
            if (!json || !Array.isArray(json.results)) {
              return callback({
                results: []
              });
            }
            json.results = json.results.filter(function (result) {
              var forbiddenLanguages = ['kr', 'cn', 'jp', 'ko', 'zh', 'ja'];
              return !forbiddenLanguages.includes(result.original_language);
            });
            json.title = Lampa.Lang.translate('surs_title_trend_week') + ' ' + Lampa.Lang.translate('surs_movies');
            callback(json);
          }, function () {
            callback({
              results: []
            });
          });
        };
        var trendingTV = function (callback) {
          var baseUrl = 'trending/tv/week';
          baseUrl = applyAgeRestriction(baseUrl);
          owner.get(baseUrl, params, function (json) {
            if (!json || !Array.isArray(json.results)) {
              return callback({
                results: []
              });
            }
            json.results = json.results.filter(function (result) {
              var forbiddenCountries = ['KR', 'CN', 'JP'];
              return !result.origin_country || !result.origin_country.some(function (country) {
                return forbiddenCountries.includes(country);
              });
            });
            json.title = Lampa.Lang.translate('surs_title_trend_week') + ' ' + Lampa.Lang.translate('surs_series');
            callback(json);
          }, function () {
            callback({
              results: []
            });
          });
        };
        trendingsData.push(trendingMovies);
        trendingsData.push(trendingTV);
        function getStreamingWithGenres(serviceName, serviceId, isRussian) {
          return function (callback) {
            var sortOptions = getSortOptions();
            var genres = getGenres();
            var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
            var genre = genres[Math.floor(Math.random() * genres.length)];
            var apiUrl = 'discover/tv?with_networks=' + serviceId + '&with_genres=' + genre.id + '&sort_by=' + sort.id;
            if (isRussian) {
              apiUrl = applyAgeRestriction(apiUrl);
              apiUrl = applyWithoutKeywords(apiUrl);
            } else {
              apiUrl = buildApiUrl(apiUrl);
            }
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' (' + Lampa.Lang.translate(genre.title) + ') ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        function getStreaming(serviceName, serviceId, isRussian) {
          return function (callback) {
            var sortOptions = getSortOptions();
            var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
            var apiUrl = 'discover/tv?with_networks=' + serviceId + '&sort_by=' + sort.id;
            if (isRussian) {
              apiUrl = applyAgeRestriction(apiUrl);
              apiUrl = applyWithoutKeywords(apiUrl);
            } else {
              apiUrl = buildApiUrl(apiUrl);
            }
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        function getSelectedStreamingServices() {
          var includeGlobal = getStoredSetting('getStreamingServices', true);
          var includeRussian = getStoredSetting('getStreamingServicesRUS', true);
          var streamingServices = getStreamingServices();
          var streamingServicesRUS = getStreamingServicesRUS();
          if (includeGlobal && includeRussian) {
            return streamingServices.concat(streamingServicesRUS);
          } else if (includeGlobal) {
            return streamingServices;
          } else if (includeRussian) {
            return streamingServicesRUS;
          }
          return [];
        }
        var selectedStreamingServices = getSelectedStreamingServices();
        selectedStreamingServices.forEach(function (service) {
          var isRussian = getStreamingServicesRUS().some(function (rusService) {
            return rusService.id === service.id;
          });
          CustomData.push(getStreamingWithGenres(service.title, service.id, isRussian));
        });
        selectedStreamingServices.forEach(function (service) {
          var isRussian = getStreamingServicesRUS().some(function (rusService) {
            return rusService.id === service.id;
          });
          CustomData.push(getStreaming(service.title, service.id, isRussian));
        });
        function getMovies(genre, options) {
          options = options || {};
          return function (callback) {
            var sortOptions = getSortOptions();
            var sort = adjustSortForMovies(sortOptions[Math.floor(Math.random() * sortOptions.length)]);
            var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;
            if (options.russian) {
              apiUrl += '&with_origin_country=RU';
            }
            if (options.ukrainian) {
              apiUrl += '&with_origin_country=UA';
            }
            if (sort.extraParams) {
              apiUrl += sort.extraParams;
            }
            apiUrl = buildApiUrl(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              if (!options.russian && !options.ukrainian) {
                json.results = applyFilters(json.results);
              }
              var titlePrefix = options.russian ? Lampa.Lang.translate('surs_russian') : options.ukrainian ? Lampa.Lang.translate('surs_ukrainian') : '';
              json.title = Lampa.Lang.translate(sort.title) + ' ' + titlePrefix + ' (' + Lampa.Lang.translate(genre.title) + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        function getTVShows(genre, options) {
          options = options || {};
          return function (callback) {
            var sortOptions = getSortOptions();
            var sort = adjustSortForTVShows(sortOptions[Math.floor(Math.random() * sortOptions.length)]);
            var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id;
            if (options.russian) {
              apiUrl += '&with_origin_country=RU';
            }
            if (options.korean) {
              apiUrl += '&with_origin_country=KR';
            }
            if (options.turkish) {
              apiUrl += '&with_origin_country=TR';
            }
            if (options.ukrainian) {
              apiUrl += '&with_origin_country=UA';
            }
            if (sort.extraParams) {
              apiUrl += sort.extraParams;
            }
            apiUrl = buildApiUrl(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              if (!options.russian && !options.ukrainian) {
                json.results = applyFilters(json.results);
              }
              var titlePrefix = options.russian ? Lampa.Lang.translate('surs_russian') : options.korean ? Lampa.Lang.translate('surs_korean') : options.turkish ? Lampa.Lang.translate('surs_turkish') : options.ukrainian ? Lampa.Lang.translate('surs_ukrainian') : '';
              json.title = Lampa.Lang.translate(sort.title) + ' ' + titlePrefix + ' ' + Lampa.Lang.translate('surs_tv_shows') + ' (' + Lampa.Lang.translate(genre.title) + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        var genres = getGenres();
        var isUkrainianLanguage = Lampa.Storage.get('language') === 'uk';
        var includeGlobalMovies = getStoredSetting('getMoviesByGenreGlobal', true);
        var includeRussianMovies = getStoredSetting('getMoviesByGenreRus', true);
        var includeUkrainianMovies = getStoredSetting('getMoviesByGenreUA', isUkrainianLanguage);
        var isGlobalTVEnabled = getStoredSetting('getTVShowsByGenreGlobal', true);
        var isRussianTVEnabled = getStoredSetting('getTVShowsByGenreRus', true);
        var isKoreanTVEnabled = getStoredSetting('getTVShowsByGenreKOR', false);
        var isTurkishTVEnabled = getStoredSetting('getTVShowsByGenreTR', true);
        var isUkrainianTVEnabled = getStoredSetting('getTVShowsByGenreUA', isUkrainianLanguage);
        genres.forEach(function (genre) {
          if (includeGlobalMovies) {
            CustomData.push(getMovies(genre));
          }
          if (includeRussianMovies) {
            CustomData.push(getMovies(genre, {
              russian: true
            }));
          }
          if (includeUkrainianMovies) {
            CustomData.push(getMovies(genre, {
              ukrainian: true
            }));
          }
        });
        genres.forEach(function (genre) {
          if (isGlobalTVEnabled) {
            CustomData.push(getTVShows(genre));
          }
          if (isRussianTVEnabled) {
            CustomData.push(getTVShows(genre, {
              russian: true
            }));
          }
          if (isKoreanTVEnabled) {
            CustomData.push(getTVShows(genre, {
              korean: true
            }));
          }
          if (isTurkishTVEnabled) {
            CustomData.push(getTVShows(genre, {
              turkish: true
            }));
          }
          if (isUkrainianTVEnabled) {
            CustomData.push(getTVShows(genre, {
              ukrainian: true
            }));
          }
        });
        function getBestContentByGenre(genre, contentType) {
          return function (callback) {
            var apiUrl = 'discover/' + contentType + '?with_genres=' + genre.id + '&sort_by=vote_average.desc' + '&vote_count.gte=500';
            apiUrl = applyAgeRestriction(apiUrl);
            apiUrl = applyWithoutKeywords(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = filterCyrillic(json.results);
              json.title = Lampa.Lang.translate(contentType === 'movie' ? 'surs_top_movies' : 'surs_top_tv') + ' (' + Lampa.Lang.translate(genre.title) + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        genres.forEach(function (genre) {
          var isMoviesEnabled = getStoredSetting('getBestContentByGenreMovie', true);
          var isTVEnabled = getStoredSetting('getBestContentByGenreTV', true);
          if (isMoviesEnabled) {
            CustomData.push(getBestContentByGenre(genre, 'movie'));
          }
          if (isTVEnabled) {
            CustomData.push(getBestContentByGenre(genre, 'tv'));
          }
        });
        function getBestContentByGenreAndPeriod(type, genre, startYear, endYear) {
          return function (callback) {
            var baseUrl = 'discover/' + type + '?with_genres=' + genre.id + '&sort_by=vote_average.desc' + '&vote_count.gte=100' + '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.gte=' + startYear + '-01-01' + '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.lte=' + endYear + '-12-31';
            baseUrl = applyAgeRestriction(baseUrl);
            baseUrl = applyWithoutKeywords(baseUrl);
            owner.get(baseUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results).filter(function (content) {
                var dateField = type === 'movie' ? 'release_date' : 'first_air_date';
                return content[dateField] && parseInt(content[dateField].substring(0, 4)) >= startYear && parseInt(content[dateField].substring(0, 4)) <= endYear;
              });
              json.title = Lampa.Lang.translate(type === 'movie' ? 'surs_top_movies' : 'surs_top_tv') + ' (' + Lampa.Lang.translate(genre.title) + ')' + Lampa.Lang.translate('surs_for_period') + startYear + '-' + endYear;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        genres.forEach(function (genre) {
          var useMovies = getStoredSetting('getBestContentByGenreAndPeriod_movie', true);
          var useTV = getStoredSetting('getBestContentByGenreAndPeriod_tv', true);
          var period1 = getRandomPeriod();
          var period2 = getRandomPeriod();
          while (period2.start === period1.start && period2.end === period1.end) {
            period2 = getRandomPeriod();
          }
          [period1, period2].forEach(function (period) {
            if (useMovies) {
              CustomData.push(getBestContentByGenreAndPeriod('movie', genre, period.start, period.end));
            }
            if (useTV) {
              CustomData.push(getBestContentByGenreAndPeriod('tv', genre, period.start, period.end));
            }
          });
        });
        CustomData = CustomData.map(wrapWithWideFlag);
        shuffleArray(CustomData);
        CustomData.splice(4, 0, getUpcomingEpisodes());
        var combinedData = partsData.concat(trendingsData).concat(CustomData);
        function randomIndex() {
          return Math.floor(Math.random() * 13) + 2;
        }
        if (globalStreamingRow) {
          var idx1 = randomIndex();
          combinedData.splice(idx1, 0, globalStreamingRow());
        }
        if (russianStreamingRow) {
          var idx2;
          var attempts = 0;
          do {
            idx2 = randomIndex();
            if (globalStreamingRow && Math.abs(idx2 - idx1) <= 1) {
              if (idx2 < idx1) {
                idx2 = Math.max(0, idx1 - 2);
              } else {
                idx2 = Math.min(combinedData.length - 1, idx1 + 2);
              }
            }
            attempts++;
          } while (globalStreamingRow && Math.abs(idx2 - idx1) <= 1 && attempts < 10);
          combinedData.splice(idx2, 0, russianStreamingRow());
        }
        if (genresRow) {
          var idx3 = randomIndex();
          if (globalStreamingRow && Math.abs(idx3 - idx1) <= 1) {
            idx3 = Math.max(0, idx1 - 2);
          }
          if (russianStreamingRow && Math.abs(idx3 - idx2) <= 1) {
            idx3 = Math.max(0, idx2 - 2);
          }
          combinedData.splice(idx3, 2, genresRow());
        }
        function loadPart(partLoaded, partEmpty) {
          Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
        }
        loadPart(onComplete, onError);
        return loadPart;
      };
    };

    /* новинки */

    var SourceTMDBnew = function (parent) {
      this.network = new Lampa.Reguest();
      this.discovery = false;
      this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var onComplete = arguments.length > 1 ? arguments[1] : undefined;
        var onError = arguments.length > 2 ? arguments[2] : undefined;
        var partsLimit = 4;
        var partsData = getPartsData();
        var CustomData = [];

        // Новая функция применения кастомных фильтров  
        function applyCustomFilters(baseUrl) {
          var minVotes = 10;
          baseUrl += '&vote_count.gte=' + minVotes;
          var excludedKeywords = ['13141', '345822', '315535', '290667', '323477', '290609'];
          baseUrl += '&without_keywords=' + encodeURIComponent(excludedKeywords.join(','));
          return baseUrl;
        }
        function getStreamingWithGenres(serviceName, serviceId) {
          return function (callback) {
            var genres = getGenres();
            var sort = adjustSortForTVShows({
              id: 'first_air_date.desc',
              title: 'surs_first_air_date_desc'
            });
            var genre = genres[Math.floor(Math.random() * genres.length)];
            var apiUrl = 'discover/tv?with_networks=' + serviceId + '&with_genres=' + genre.id + '&sort_by=' + sort.id;
            if (sort.extraParams) {
              apiUrl += sort.extraParams;
            }
            apiUrl = applyCustomFilters(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' (' + Lampa.Lang.translate(genre.title) + ') ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        function getStreaming(serviceName, serviceId) {
          return function (callback) {
            var sort = adjustSortForTVShows({
              id: 'first_air_date.desc',
              title: 'surs_first_air_date_desc'
            });
            var apiUrl = 'discover/tv?with_networks=' + serviceId + '&sort_by=' + sort.id;
            if (sort.extraParams) {
              apiUrl += sort.extraParams;
            }
            apiUrl = applyCustomFilters(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        function getMovies(genre, options) {
          options = options || {};
          return function (callback) {
            var sort = adjustSortForMovies({
              id: 'first_air_date.desc',
              title: 'surs_first_air_date_desc'
            });
            var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;
            if (sort.extraParams) {
              apiUrl += sort.extraParams;
            }
            apiUrl = applyCustomFilters(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' (' + Lampa.Lang.translate(genre.title) + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        function getTVShows(genre, options) {
          options = options || {};
          return function (callback) {
            var sort = adjustSortForTVShows({
              id: 'first_air_date.desc',
              title: 'surs_first_air_date_desc'
            });
            var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id;
            if (sort.extraParams) {
              apiUrl += sort.extraParams;
            }
            apiUrl = applyCustomFilters(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_tv_shows') + ' (' + Lampa.Lang.translate(genre.title) + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        var genres = getGenres();

        // Глобальные фильмы и сериалы  
        genres.forEach(function (genre) {
          CustomData.push(getMovies(genre));
        });
        genres.forEach(function (genre) {
          CustomData.push(getTVShows(genre));
        });
        var streamingServices = getStreamingServices();
        streamingServices.forEach(function (service) {
          CustomData.push(getStreamingWithGenres(service.title, service.id));
        });
        streamingServices.forEach(function (service) {
          CustomData.push(getStreaming(service.title, service.id));
        });
        CustomData = CustomData.map(wrapWithWideFlag);
        shuffleArray(CustomData);
        var combinedData = partsData.concat(CustomData);
        function loadPart(partLoaded, partEmpty) {
          Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
        }
        loadPart(onComplete, onError);
        return loadPart;
      };
    };

    /* для детей */

    var SourceTMDBkids = function (parent) {
      this.network = new Lampa.Reguest();
      this.discovery = false;
      this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var onComplete = arguments.length > 1 ? arguments[1] : undefined;
        var onError = arguments.length > 2 ? arguments[2] : undefined;
        var partsLimit = 4;
        var genres = [{
          id: 28,
          title: Lampa.Lang.translate('surs_genre_action')
        }, {
          id: 35,
          title: Lampa.Lang.translate('surs_genre_comedy')
        }, {
          id: 16,
          title: Lampa.Lang.translate('surs_genre_animation')
        }, {
          id: 10762,
          title: Lampa.Lang.translate('surs_genre_kids')
        }, {
          id: 12,
          title: Lampa.Lang.translate('surs_genre_adventure')
        }, {
          id: 878,
          title: Lampa.Lang.translate('surs_genre_sci_fi')
        }, {
          id: 10751,
          title: Lampa.Lang.translate('surs_genre_family')
        }, {
          id: 14,
          title: Lampa.Lang.translate('surs_genre_fantasy')
        }];
        var streamingServices = [{
          id: 49,
          title: 'HBO'
        }, {
          id: 77,
          title: 'SyFy'
        }, {
          id: 2552,
          title: 'Apple TV+'
        }, {
          id: 453,
          title: 'Hulu'
        }, {
          id: 1024,
          title: 'Amazon Prime'
        }, {
          id: 213,
          title: 'Netflix'
        }, {
          id: 3186,
          title: 'HBO Max'
        }, {
          id: 2076,
          title: 'Paramount+'
        }, {
          id: 4330,
          title: 'Paramount+'
        }, {
          id: 3353,
          title: 'Peacock'
        }, {
          id: 2739,
          title: 'Disney+'
        }, {
          id: 44,
          title: 'Disney XD'
        }, {
          id: 281,
          title: 'Disney XD'
        }, {
          id: 2,
          title: 'ABC'
        }, {
          id: 6,
          title: 'NBC'
        }, {
          id: 16,
          title: 'CBS'
        }, {
          id: 318,
          title: 'Starz'
        }, {
          id: 174,
          title: 'BBC'
        }, {
          id: 56,
          title: 'Cartoon Network'
        }, {
          id: 19,
          title: 'FOX'
        }, {
          id: 2686,
          title: 'FOX kids'
        }, {
          id: 13,
          title: 'Nickelodeon'
        }];
        function applyMinVotes(baseUrl) {
          var minVotes = 5;
          baseUrl += '&vote_count.gte=' + minVotes;
          return baseUrl;
        }
        function applyAgeRestriction(baseUrl) {
          var certification = '6+';
          baseUrl += '&certification_country=RU&certification=' + encodeURIComponent(certification);
          return baseUrl;
        }
        function applyWithoutKeywords(baseUrl) {
          var baseExcludedKeywords = ['346488', '158718', '41278', '13141', '345822', '315535', '290667', '323477', '290609'];
          baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));
          return baseUrl;
        }
        function buildApiUrl(baseUrl) {
          baseUrl = applyMinVotes(baseUrl);
          baseUrl = applyAgeRestriction(baseUrl);
          baseUrl = applyWithoutKeywords(baseUrl);
          return baseUrl;
        }
        var buttonsData = getPartsData();
        var partsData = [];
        function getStreamingWithGenres(serviceName, serviceId) {
          return function (callback) {
            var sort = allSortOptions[Math.floor(Math.random() * allSortOptions.length)];
            var genre = genres[Math.floor(Math.random() * genres.length)];
            var apiUrl = buildApiUrl('discover/tv?with_networks=' + serviceId + '&with_genres=' + genre.id + '&sort_by=' + sort.key + '&air_date.lte=' + new Date().toISOString().substr(0, 10));
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' (' + genre.title + ') ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        function getStreaming(serviceName, serviceId) {
          return function (callback) {
            var sort = allSortOptions[Math.floor(Math.random() * allSortOptions.length)];
            var apiUrl = buildApiUrl('discover/tv?with_networks=' + serviceId + '&sort_by=' + sort.key + '&air_date.lte=' + new Date().toISOString().substr(0, 10));
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        var selectedStreamingServices = streamingServices.concat(allStreamingServicesRUS || []);
        selectedStreamingServices.forEach(function (service) {
          partsData.push(getStreamingWithGenres(service.title, service.id));
          partsData.push(getStreaming(service.title, service.id));
        });
        function getMovies(genre, options) {
          options = options || {};
          return function (callback) {
            var sort = adjustSortForMovies(allSortOptions[Math.floor(Math.random() * allSortOptions.length)]);
            var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.key;
            if (options.russian) {
              apiUrl += '&with_original_language=ru';
            }
            if (sort.key === 'release_date.desc') {
              var today = new Date().toISOString().split('T')[0];
              apiUrl += '&release_date.lte=' + today;
              if (options.russian) {
                apiUrl += '&region=RU';
              }
            }
            if (sort.extraParams) {
              apiUrl += sort.extraParams;
            }
            apiUrl = buildApiUrl(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              if (!options.russian) {
                json.results = applyFilters(json.results);
              }
              var titlePrefix = options.russian ? ' — ' + Lampa.Lang.translate('surs_russian') : '';
              json.title = Lampa.Lang.translate(sort.title) + titlePrefix + ' (' + genre.title + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        genres.forEach(function (genre) {
          partsData.push(getMovies(genre));
          partsData.push(getMovies(genre, {
            russian: true
          }));
        });
        function getTVShows(genre, options) {
          options = options || {};
          return function (callback) {
            var sort = allSortOptions[Math.floor(Math.random() * allSortOptions.length)];
            var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.key;
            if (options.russian) {
              apiUrl += '&with_origin_country=RU';
            }
            apiUrl = buildApiUrl(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              if (!options.russian) {
                json.results = applyFilters(json.results);
              }
              var titlePrefix = options.russian ? ' — ' + Lampa.Lang.translate('surs_russian') : '';
              json.title = Lampa.Lang.translate(sort.title) + titlePrefix + ' ' + Lampa.Lang.translate('surs_tv_shows') + ' (' + genre.title + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        genres.forEach(function (genre) {
          partsData.push(getTVShows(genre));
          partsData.push(getTVShows(genre, {
            russian: true
          }));
        });
        function getAnimatedMovies(options) {
          options = options || {};
          return function (callback) {
            var genreIds = ['16', '10751'];
            for (var i = 0; i < allSortOptions.length; i++) {
              var sort = allSortOptions[i];
              var adjustedSort = adjustSortForMovies(sort);
              var apiUrl = 'discover/movie?with_genres=' + genreIds.join(',') + '&sort_by=' + adjustedSort.key;
              if (options.russian) {
                apiUrl += '&with_original_language=ru';
              }
              if (adjustedSort.key === 'release_date.desc') {
                var today = new Date().toISOString().split('T')[0];
                apiUrl += '&release_date.lte=' + today;
                if (options.russian) {
                  apiUrl += '&region=RU';
                }
              }
              if (adjustedSort.extraParams) {
                apiUrl += adjustedSort.extraParams;
              }
              apiUrl = buildApiUrl(apiUrl);
              owner.get(apiUrl, params, function (sortOption) {
                return function (json) {
                  if (!json || !Array.isArray(json.results)) {
                    return callback({
                      results: []
                    });
                  }
                  json.results = applyFilters(json.results);
                  var titlePrefix = options.russian ? ' — ' + Lampa.Lang.translate('surs_russian') : '';
                  json.title = Lampa.Lang.translate(sortOption.title) + titlePrefix + ' (' + Lampa.Lang.translate('surs_genre_animation') + ', ' + Lampa.Lang.translate('surs_genre_kids') + ')';
                  callback(json);
                };
              }(sort), function () {
                callback({
                  results: []
                });
              });
            }
          };
        }
        for (var j = 0; j < allSortOptions.length; j++) {
          partsData.push(getAnimatedMovies());
          partsData.push(getAnimatedMovies({
            russian: true
          }));
        }
        function getBestContentByGenre(genre, contentType) {
          return function (callback) {
            var apiUrl = 'discover/' + contentType + '?with_genres=' + genre.id + '&sort_by=vote_average.desc' + '&vote_count.gte=200';
            var russianApiUrl = apiUrl + '&with_origin_country=RU';
            apiUrl = applyAgeRestriction(apiUrl);
            apiUrl = applyWithoutKeywords(apiUrl);
            russianApiUrl = applyAgeRestriction(russianApiUrl);
            russianApiUrl = applyWithoutKeywords(russianApiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) return callback({
                results: []
              });
              json.results = filterCyrillic(json.results);
              json.title = Lampa.Lang.translate(contentType === 'movie' ? 'surs_top_movies' : 'surs_top_tv') + ' (' + genre.title + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
            owner.get(russianApiUrl, params, function (russianJson) {
              if (!russianJson || !Array.isArray(russianJson.results)) return callback({
                results: []
              });
              russianJson.results = filterCyrillic(russianJson.results);
              russianJson.title = Lampa.Lang.translate('surs_rus') + ' ' + Lampa.Lang.translate(contentType === 'movie' ? 'surs_top_movies' : 'surs_top_tv') + ' (' + genre.title + ')';
              callback(russianJson);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        genres.forEach(function (genre) {
          partsData.push(getBestContentByGenre(genre, 'movie'));
          partsData.push(getBestContentByGenre(genre, 'tv'));
        });
        function getBestContentByGenreAndPeriod(type, genre, startYear, endYear) {
          return function (callback) {
            var baseUrl = 'discover/' + type + '?with_genres=' + genre.id + '&sort_by=vote_average.desc' + '&vote_count.gte=100' + '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.gte=' + startYear + '-01-01' + '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.lte=' + endYear + '-12-31';
            baseUrl = applyAgeRestriction(baseUrl);
            baseUrl = applyWithoutKeywords(baseUrl);
            owner.get(baseUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) return callback({
                results: []
              });
              json.results = applyFilters(json.results).filter(function (content) {
                var dateField = type === 'movie' ? 'release_date' : 'first_air_date';
                return content[dateField] && content[dateField] && parseInt(content[dateField].substring(0, 4)) >= startYear && parseInt(content[dateField].substring(0, 4)) <= endYear;
              });
              json.title = Lampa.Lang.translate(type === 'movie' ? 'surs_top_movies' : 'surs_top_tv') + ' (' + genre.title + ') ' + Lampa.Lang.translate('surs_for_period') + startYear + '–' + endYear;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        genres.forEach(function (genre) {
          var period = getRandomPeriod();
          partsData.push(getBestContentByGenreAndPeriod('movie', genre, period.start, period.end));
          partsData.push(getBestContentByGenreAndPeriod('tv', genre, period.start, period.end));
        });
        var forKids = [{
          id: 1,
          title: 'Спанч Боб'
        }, {
          id: 2,
          title: 'Губка Боб'
        }, {
          id: 3,
          title: 'Teenage Mutant Ninja Turtles'
        }, {
          id: 4,
          title: 'Черепашки-ниндзя'
        }, {
          id: 5,
          title: 'Fairly OddParents'
        }, {
          id: 6,
          title: 'Джимми Нейтрон'
        }, {
          id: 8,
          title: 'Аватар: Легенда об Аанге'
        }, {
          id: 9,
          title: 'Аватар: Легенда о Корре'
        }, {
          id: 101,
          title: 'Lego'
        }, {
          id: 102,
          title: 'Том и Джерри'
        }, {
          id: 103,
          title: 'Микки Маус'
        }, {
          id: 104,
          title: 'Гуфи'
        }, {
          id: 105,
          title: 'Снупи'
        }, {
          id: 106,
          title: 'Простоквашино'
        }, {
          id: 107,
          title: 'Ну, погоди!'
        }, {
          id: 108,
          title: 'Чип и Дейл'
        }, {
          id: 109,
          title: 'DuckTales'
        }, {
          id: 110,
          title: 'Looney Tunes'
        }, {
          id: 111,
          title: 'Покемон'
        }, {
          id: 112,
          title: 'Даша-путешественница'
        }, {
          id: 113,
          title: 'Свинка Пеппа'
        }, {
          id: 114,
          title: 'Барбоскины'
        }, {
          id: 115,
          title: 'Смешарики'
        }, {
          id: 116,
          title: 'Фиксики'
        }, {
          id: 120,
          title: 'Гравити Фолз'
        }, {
          id: 121,
          title: 'Чудеса на виражах'
        }, {
          id: 122,
          title: 'Пингвины из Мадагаскара'
        }, {
          id: 123,
          title: 'Король Лев'
        }, {
          id: 124,
          title: 'Холодное сердце'
        }, {
          id: 126,
          title: 'Как приручить дракона'
        }, {
          id: 127,
          title: 'Зверополис'
        }, {
          id: 128,
          title: 'Миньоны'
        }, {
          id: 129,
          title: 'Шрэк'
        }, {
          id: 206,
          title: 'Маша и Медведь'
        }, {
          id: 207,
          title: 'Котенок по имени Гав'
        }, {
          id: 208,
          title: 'Чебурашка'
        }, {
          id: 209,
          title: 'Малыш и Карлсон'
        }, {
          id: 210,
          title: 'Лунтик'
        }, {
          id: 211,
          title: 'Три богатыря'
        }, {
          id: 212,
          title: 'Иван Царевич и Серый Волк'
        }, {
          id: 213,
          title: 'Кот Леопольд'
        }, {
          id: 215,
          title: 'Варежка'
        }, {
          id: 217,
          title: 'Каникулы Бонифация'
        }, {
          id: 219,
          title: 'Сказка о царе Салтане'
        }, {
          id: 220,
          title: 'Алеша Попович'
        }, {
          id: 251,
          title: 'Илья муромец'
        }, {
          id: 233,
          title: 'Оранжевая корова'
        }, {
          id: 222,
          title: 'Малышарики'
        }, {
          id: 223,
          title: 'Winnie-the-Pooh'
        }, {
          id: 225,
          title: 'Щенячий патруль'
        }, {
          id: 226,
          title: 'Tiny Toon'
        }, {
          id: 227,
          title: 'Обезьянки'
        }, {
          id: 229,
          title: 'Буратино'
        }];
        function searchByKeyword(keyword) {
          return function (callback) {
            var movieApiUrl = 'search/movie?query=' + encodeURIComponent(keyword.title);
            var tvApiUrl = 'search/tv?query=' + encodeURIComponent(keyword.title);
            movieApiUrl = buildApiUrl(movieApiUrl);
            tvApiUrl = buildApiUrl(tvApiUrl);
            var movieResults = null;
            var tvResults = null;
            function processResults() {
              if (movieResults !== null && tvResults !== null) {
                var combinedResults = movieResults.concat(tvResults);
                combinedResults = filterCyrillic(combinedResults);
                combinedResults = combinedResults.filter(function (item) {
                  return (item.vote_average || 0) >= 6.1;
                });
                combinedResults.sort(function (a, b) {
                  return (b.vote_average || 0) - (a.vote_average || 0);
                });
                var json = {
                  results: combinedResults,
                  title: keyword.title // здесь обычно уже русское название
                };
                callback(json);
              }
            }
            owner.get(movieApiUrl, {}, function (json) {
              movieResults = json && Array.isArray(json.results) ? json.results : [];
              processResults();
            }, function () {
              movieResults = [];
              processResults();
            });
            owner.get(tvApiUrl, {}, function (json) {
              tvResults = json && Array.isArray(json.results) ? json.results : [];
              processResults();
            }, function () {
              tvResults = [];
              processResults();
            });
          };
        }
        forKids.forEach(function (keyword) {
          partsData.push(searchByKeyword(keyword));
        });
        var kidsStudios = [{
          id: 2,
          title: 'Disney'
        }, {
          id: 3,
          title: 'Pixar'
        }, {
          id: 7501,
          title: 'Союзмультфильм'
        }, {
          id: 14599,
          title: 'Союзмультфильм (СССР)'
        }, {
          id: 521,
          title: 'DreamWorks Animation'
        }, {
          id: 9383,
          title: 'Blue Sky Studios'
        }, {
          id: 6704,
          title: 'Illumination Entertainment'
        }, {
          id: 2251,
          title: 'Sony Pictures Animation'
        }, {
          id: 10342,
          title: 'Studio Ghibli'
        }];
        function getStudioMovies(studio) {
          return function (callback) {
            var movieApiUrl = 'discover/movie?with_companies=' + studio.id + '&sort_by=vote_average.desc';
            movieApiUrl = applyWithoutKeywords(movieApiUrl);
            owner.get(movieApiUrl, {}, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: [],
                  title: Lampa.Lang.translate('surs_movies') + ' ' + Lampa.Lang.translate('surs_from') + ' ' + studio.title
                });
              }
              var movieResults = filterCyrillic(json.results);
              callback({
                results: movieResults,
                title: Lampa.Lang.translate('surs_movies') + ' ' + Lampa.Lang.translate('surs_from') + ' ' + studio.title
              });
            }, function () {
              callback({
                results: [],
                title: Lampa.Lang.translate('surs_movies') + ' ' + Lampa.Lang.translate('surs_from') + ' ' + studio.title
              });
            });
          };
        }
        function getStudioTVShows(studio) {
          return function (callback) {
            var tvApiUrl = 'discover/tv?with_companies=' + studio.id + '&sort_by=vote_average.desc';
            tvApiUrl = applyWithoutKeywords(tvApiUrl);
            owner.get(tvApiUrl, {}, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: [],
                  title: Lampa.Lang.translate('surs_tv_shows') + ' ' + Lampa.Lang.translate('surs_from') + ' ' + studio.title
                });
              }
              var tvResults = filterCyrillic(json.results);
              callback({
                results: tvResults,
                title: Lampa.Lang.translate('surs_tv_shows') + ' ' + Lampa.Lang.translate('surs_from') + ' ' + studio.title
              });
            }, function () {
              callback({
                results: [],
                title: Lampa.Lang.translate('surs_tv_shows') + ' ' + Lampa.Lang.translate('surs_from') + ' ' + studio.title
              });
            });
          };
        }
        kidsStudios.forEach(function (studio) {
          partsData.push(getStudioMovies(studio));
          partsData.push(getStudioTVShows(studio));
        });
        function getNickelodeonContent() {
          return function (callback) {
            var movieApiUrl = 'discover/movie?with_companies=4';
            var tvApiUrl = 'discover/tv?with_networks=13';
            movieApiUrl = buildApiUrl(movieApiUrl);
            tvApiUrl = buildApiUrl(tvApiUrl);
            var movieResults = null;
            var tvResults = null;
            function processResults() {
              if (movieResults !== null && tvResults !== null) {
                var combinedResults = movieResults.concat(tvResults);
                combinedResults = filterCyrillic(combinedResults);
                combinedResults.sort(function (a, b) {
                  return (b.vote_average || 0) - (a.vote_average || 0);
                });
                var json = {
                  results: combinedResults,
                  title: 'Nickelodeon'
                };
                callback(json);
              }
            }
            owner.get(movieApiUrl, {}, function (json) {
              movieResults = json && Array.isArray(json.results) ? json.results : [];
              processResults();
            }, function () {
              movieResults = [];
              processResults();
            });
            owner.get(tvApiUrl, {}, function (json) {
              tvResults = json && Array.isArray(json.results) ? json.results : [];
              processResults();
            }, function () {
              tvResults = [];
              processResults();
            });
          };
        }
        partsData.push(getNickelodeonContent());
        partsData = partsData.map(wrapWithWideFlag);
        shuffleArray(partsData);
        var combinedData = buttonsData.concat(partsData);
        function loadPart(partLoaded, partEmpty) {
          Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
        }
        loadPart(onComplete, onError);
        return loadPart;
      };
    };
    var SourceTMDBrus = function (parent) {
      this.network = new Lampa.Reguest();
      this.discovery = false;
      this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var onComplete = arguments.length > 1 ? arguments[1] : undefined;
        var onError = arguments.length > 2 ? arguments[2] : undefined;
        var partsLimit = 4;

        // Helpers  
        function applyMinVotes(baseUrl) {
          var minVotes = 2;
          baseUrl += '&vote_count.gte=' + minVotes;
          return baseUrl;
        }
        function applyAgeRestriction(baseUrl) {
          return baseUrl;
        }
        function applyWithoutKeywords(baseUrl) {
          var baseExcludedKeywords = ['346488', '158718', '41278'];
          baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));
          return baseUrl;
        }
        function buildApiUrl(baseUrl) {
          baseUrl = applyMinVotes(baseUrl);
          baseUrl = applyAgeRestriction(baseUrl);
          baseUrl = applyWithoutKeywords(baseUrl);
          return baseUrl;
        }
        var buttonsData = getPartsData();
        var partsData = [];

        // Russian streaming services — new TV shows (by air_date)  
        function getStreamingWithGenres(serviceName, serviceId) {
          return function (callback) {
            var sort = adjustSortForTVShows({
              id: 'first_air_date.desc',
              title: 'surs_first_air_date_desc'
            });
            var genre = allGenres[Math.floor(Math.random() * allGenres.length)];
            var apiUrl = 'discover/tv?' + 'with_networks=' + serviceId + '&with_genres=' + genre.id + '&sort_by=' + sort.id;
            apiUrl += sort.extraParams || '';
            apiUrl = applyAgeRestriction(apiUrl);
            apiUrl = applyWithoutKeywords(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' (' + Lampa.Lang.translate(genre.title) + ') ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        function getStreaming(serviceName, serviceId) {
          return function (callback) {
            var sort = adjustSortForTVShows({
              id: 'first_air_date.desc',
              title: 'surs_first_air_date_desc'
            });
            var apiUrl = 'discover/tv?with_networks=' + serviceId + '&sort_by=' + sort.id;
            apiUrl += sort.extraParams || '';
            apiUrl = applyAgeRestriction(apiUrl);
            apiUrl = applyWithoutKeywords(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.results = applyFilters(json.results);
              json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        var selectedStreamingServices = allStreamingServicesRUS;
        selectedStreamingServices.forEach(function (service) {
          partsData.push(getStreamingWithGenres(service.title, service.id));
        });
        selectedStreamingServices.forEach(function (service) {
          partsData.push(getStreaming(service.title, service.id));
        });

        // Russian new movies  
        function getMovies(genre) {
          return function (callback) {
            var sort = adjustSortForMovies({
              id: 'release_date.desc',
              title: 'surs_first_air_date_desc'
            });
            var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;
            apiUrl += sort.extraParams || '';
            apiUrl += '&with_origin_country=RU';
            apiUrl = applyWithoutKeywords(apiUrl);
            apiUrl = applyAgeRestriction(apiUrl);
            apiUrl = applyMinVotes(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              var titlePrefix = Lampa.Lang.translate('surs_russian');
              json.title = Lampa.Lang.translate(sort.title) + ' ' + titlePrefix + ' (' + Lampa.Lang.translate(genre.title) + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        allGenres.forEach(function (genre) {
          partsData.push(getMovies(genre));
        });

        // Russian new TV shows (with date filter to ensure “new”)  
        function getTVShows(genre) {
          return function (callback) {
            var sort = adjustSortForTVShows({
              id: 'first_air_date.desc',
              title: 'surs_first_air_date_desc'
            });
            var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id + '&with_origin_country=RU';
            apiUrl += sort.extraParams || '';
            apiUrl = applyWithoutKeywords(apiUrl);
            owner.get(apiUrl, params, function (json) {
              if (!json || !Array.isArray(json.results)) {
                return callback({
                  results: []
                });
              }
              json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_russian') + ' ' + Lampa.Lang.translate('surs_tv_shows') + ' (' + Lampa.Lang.translate(genre.title) + ')';
              callback(json);
            }, function () {
              callback({
                results: []
              });
            });
          };
        }
        allGenres.forEach(function (genre) {
          partsData.push(getTVShows(genre));
        });

        // Shuffle and wide-flag wrappers  
        partsData = partsData.map(wrapWithWideFlag);
        shuffleArray(partsData);
        var combinedData = buttonsData.concat(partsData);
        function loadPart(partLoaded, partEmpty) {
          Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
        }
        loadPart(onComplete, onError);
        return loadPart;
      };
    };
    function add() {
      // Проверка наличия Lampa API
      if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.Api || !Lampa.Params) {
        console.error('Lampa API is not available');
        return;
      }

      // Проверка наличия Lampa.Api.sources.tmdb
      if (!Lampa.Api.sources || !Lampa.Api.sources.tmdb) {
        console.error('Lampa.Api.sources.tmdb is not defined');
        return;
      }

      // Получаем значение из Storage
      var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
      var sourceNameNew = sourceName + ' NEW';
      var sourceNameKids = sourceName + ' KIDS';
      var sourceNameRus = sourceName + ' RUS';

      // Функция для копирования свойств объекта (замена Object.assign для ES5)
      function assign(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          if (source) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      }

      // Создаем источники
      var surs_mod = assign({}, Lampa.Api.sources.tmdb, new SourceTMDB(Lampa.Api.sources.tmdb));
      var surs_mod_new = assign({}, Lampa.Api.sources.tmdb, new SourceTMDBnew(Lampa.Api.sources.tmdb));
      var surs_mod_kids = assign({}, Lampa.Api.sources.tmdb, new SourceTMDBkids(Lampa.Api.sources.tmdb));
      var surs_mod_rus = assign({}, Lampa.Api.sources.tmdb, new SourceTMDBrus(Lampa.Api.sources.tmdb));

      // Проверка на успешное создание источников
      if (!surs_mod || !surs_mod_new || !surs_mod_kids || !surs_mod_rus) {
        console.error('Failed to create one or more TMDB sources');
        return;
      }

      // Присваиваем источники напрямую (для совместимости с IE8)
      Lampa.Api.sources.surs_mod = surs_mod;
      Lampa.Api.sources.surs_mod_new = surs_mod_new;
      Lampa.Api.sources.surs_mod_kids = surs_mod_kids;
      Lampa.Api.sources.surs_mod_rus = surs_mod_rus;

      // Динамическое определение источников с использованием Object.defineProperty (для IE9+)
      try {
        Object.defineProperty(Lampa.Api.sources, sourceName, {
          get: function () {
            return surs_mod;
          }
        });
        Object.defineProperty(Lampa.Api.sources, sourceNameNew, {
          get: function () {
            return surs_mod_new;
          }
        });
        Object.defineProperty(Lampa.Api.sources, sourceNameKids, {
          get: function () {
            return surs_mod_kids;
          }
        });
        Object.defineProperty(Lampa.Api.sources, sourceNameRus, {
          get: function () {
            return surs_mod_rus;
          }
        });
      } catch (e) {
        console.warn('Object.defineProperty not supported, using direct assignment: ', e);
        // Запасной вариант для IE8
        Lampa.Api.sources[sourceName] = surs_mod;
        Lampa.Api.sources[sourceNameNew] = surs_mod_new;
        Lampa.Api.sources[sourceNameKids] = surs_mod_kids;
        Lampa.Api.sources[sourceNameRus] = surs_mod_rus;
      }

      // Обновление параметров меню
      var newSourceOptions = {};
      newSourceOptions[sourceName] = sourceName;
      newSourceOptions[sourceNameNew] = sourceNameNew;
      newSourceOptions[sourceNameKids] = sourceNameKids;
      newSourceOptions[sourceNameRus] = sourceNameRus;
      var mergedOptions = assign({}, Lampa.Params.values['source'], newSourceOptions);
      try {
        Lampa.Params.select('source', mergedOptions, 'tmdb');
      } catch (e) {
        console.error('Error updating Lampa.Params.select: ', e);
      }
    }
    function startProfileListener() {
      var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
      var sourceNameKids = sourceName + ' KIDS';
      var sourceNameRus = sourceName + ' RUS';
      var sourceNameNew = sourceName + ' NEW';
      Lampa.Listener.follow('profile', function (event) {
        if (event.type !== 'changed') return;
        if (!event.params.surs) return;
        if (event.params.forKids) {
          changeSource(sourceNameKids, true);
        } else if (event.params.onlyRus) {
          changeSource(sourceNameRus, true);
        } else {
          changeSource(sourceName, true);
        }
      });
      Lampa.Storage.listener.follow('change', function (event) {
        if (event.name === "source" && !sourceChangedByProfile) {
          if (event.value === sourceName || event.value === sourceNameKids || event.value === sourceNameRus || event.value === sourceNameNew) {
            softRefresh(event.value, true);
          }
        }
      });
      var initialSource = Lampa.Storage.get('source');
      if (false && (initialSource === sourceName || initialSource === sourceNameKids || initialSource === sourceNameRus)) {
        setTimeout(function () {
          if (!Lampa.Storage.get('start_page') || Lampa.Storage.get('start_page') === 'main') {
            softRefresh(initialSource, false);
          }
        }, 300);
      }
    }
    var sourceChangedByProfile = false;
    function changeSource(newSource, isProfileChanged) {
      if (typeof isProfileChanged === 'undefined') {
        isProfileChanged = false;
      }
      var currentSource = Lampa.Storage.get('source');
      if (currentSource !== newSource) {
        sourceChangedByProfile = true;
        Lampa.Storage.set('source', newSource);
        setTimeout(function () {
          softRefresh(newSource, false);
          sourceChangedByProfile = false;
        }, 10);
      }
    }
    function softRefresh(source, isFromSourceChange) {
      Lampa.Activity.push({
        title: Lampa.Lang.translate('title_main') + ' - ' + source.toUpperCase(),
        component: 'main',
        source: source
      });
      if (isFromSourceChange) {
        setTimeout(function () {
          Lampa.Controller.toggle('settings');
        }, 100);
      }
    }

    // Логика скрытия и отображения пункта "surs" в настройках
    Lampa.Settings.listener.follow('open', function (e) {
      if (e.name === 'surs') {
        setTimeout(function () {
          var currentSource = Lampa.Storage.get('source');
          var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
          var sourceNameKids = sourceName + ' KIDS';
          var sourceNameRus = sourceName + ' RUS';
          var sourceNameNew = sourceName + ' NEW';
          var paramsToHide = ['surs_cirillic', 'surs_minVotes', 'surs_ageRestrictions', 'surs_withoutKeywords', 'surs_getMoviesByGenre', 'surs_getTVShowsByGenre', 'surs_streaming', 'surs_getBestContentByGenre', 'surs_getBestContentByGenreAndPeriod', 'surs_filter_menu', 'surs_best_content', 'surs_sort_options', 'surs_global_streamings', 'surs_rus_streaming', 'surs_genres', 'surs_global_streaming'];
          var shouldHide = currentSource === sourceNameKids || currentSource === sourceNameRus || currentSource === sourceNameNew;

          // Объект с локализациями
          var translations = {
            surs_geo_filters: {
              ru: "Настройки подборок",
              en: "Collection settings",
              uk: "Налаштування підбірок"
            },
            surs_filters: {
              ru: "Фильтры",
              en: "Filters",
              uk: "Фільтри"
            },
            surs_technical_settings: {
              ru: "Технические настройки",
              en: "Technical settings",
              uk: "Технічні налаштування"
            }
          };

          // Получаем текущий язык
          var currentLocale = Lampa.Storage.get('language') || 'ru'; // 'ru' как запасной вариант, если язык не определен

          // Скрываем или показываем параметры
          paramsToHide.forEach(function (param) {
            var element = $('div[data-name="' + param + '"]');
            if (shouldHide) {
              element.hide();
            } else {
              element.show();
            }
          });

          // Удаление заголовков с локализованными названиями
          if (shouldHide) {
            $('div.settings-param-title span').each(function () {
              var text = $(this).text().trim();
              // Проверяем, соответствует ли текст одному из локализованных значений
              if (text === translations.surs_geo_filters[currentLocale] || text === translations.surs_filters[currentLocale] || text === translations.surs_technical_settings[currentLocale]) {
                $(this).closest('div.settings-param-title').remove();
              }
            });
          }
        }, 1);
      }
    });
    function addSettingMenu() {
      // Проверка наличия Lampa API
      if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.SettingsApi || !Lampa.Lang || !Lampa.Select || !Lampa.Activity || !Lampa.Controller || !Lampa.Listener || !Lampa.Input || !Lampa.Noty) {
        console.error('Lampa API is not available');
        return;
      }
      try {
        var showButtonsSelectionMenu = function (previousController) {
          try {
            var items = [{
              title: sourceName,
              id: 'Button_sourceName'
            }, {
              title: sourceNameKids,
              id: 'Button_sourceNameKids'
            }, {
              title: sourceNameRus,
              id: 'Button_sourceNameRus'
            }];
            var list = [];
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              var isEnabled = getStoredSetting(item.id, false);
              list.push({
                title: item.title,
                id: item.id,
                checkbox: true,
                checked: isEnabled
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_select_menu_sources'),
              items: list,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selectedItem) {
                try {
                  var key = selectedItem.id;
                  var isEnabled = getStoredSetting(key, false);
                  setStoredSetting(key, !isEnabled);
                  selectedItem.checked = !isEnabled;
                  addMenuButtons();
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showButtonsSelectionMenu:', e);
          }
        };
        var addMenuButton = function (title, action, icon, callback) {
          try {
            var button = $('<li class="menu__item selector" data-action="' + action + '">' + '<div class="menu__ico">' + icon + '</div>' + '<div class="menu__text">' + title + '</div>' + '</li>');
            button.on('hover:enter', callback);
            $('.menu .menu__list').eq(0).append(button);
          } catch (e) {
            console.error('Error in addMenuButton:', e);
          }
        };
        var addMenuButtons = function () {
          try {
            $('.menu__item[data-action="custom-source"]').remove();
            var isSourceNameEnabled = getStoredSetting('Button_sourceName', false);
            var isSourceNameKidsEnabled = getStoredSetting('Button_sourceNameKids', false);
            var isSourceNameRusEnabled = getStoredSetting('Button_sourceNameRus', false);
            if (isSourceNameEnabled) {
              addMenuButton(sourceName, 'custom-source', icon, function () {
                try {
                  Lampa.Activity.push({
                    source: sourceName,
                    title: sourceName,
                    component: 'main',
                    page: 1
                  });
                } catch (e) {
                  console.error('Error in sourceName button callback:', e);
                }
              });
            }
            if (isSourceNameKidsEnabled) {
              addMenuButton(sourceNameKids, 'custom-source', icon, function () {
                try {
                  Lampa.Activity.push({
                    source: sourceNameKids,
                    title: sourceNameKids,
                    component: 'main',
                    page: 1
                  });
                } catch (e) {
                  console.error('Error in sourceNameKids button callback:', e);
                }
              });
            }
            if (isSourceNameRusEnabled) {
              addMenuButton(sourceNameRus, 'custom-source', icon, function () {
                try {
                  Lampa.Activity.push({
                    source: sourceNameRus,
                    title: sourceNameRus,
                    component: 'main',
                    page: 1
                  });
                } catch (e) {
                  console.error('Error in sourceNameRus button callback:', e);
                }
              });
            }
          } catch (e) {
            console.error('Error in addMenuButtons:', e);
          }
        };
        var showSelectionMenu = function (title, items, storagePrefix, keyField, previousController) {
          try {
            keyField = typeof keyField === 'undefined' ? 'id' : keyField;
            var list = [];
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              var key = item[keyField];
              var isEnabled = getStoredSetting(storagePrefix + key, true);
              list.push({
                title: Lampa.Lang.translate(item.title),
                id: key,
                checkbox: true,
                checked: isEnabled
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate(title),
              items: list,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController);
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selectedItem) {
                try {
                  var key = storagePrefix + selectedItem.id;
                  var isEnabled = getStoredSetting(key, true);
                  setStoredSetting(key, !isEnabled);
                  selectedItem.checked = !isEnabled;
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showSelectionMenu:', e);
          }
        };
        var showStreamingSelectionMenu = function (previousController) {
          try {
            var items = [{
              title: Lampa.Lang.translate('surs_global'),
              id: 'getStreamingServices'
            }, {
              title: Lampa.Lang.translate('surs_russian'),
              id: 'getStreamingServicesRUS'
            }];
            var list = [];
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              var isEnabled = getStoredSetting(item.id, true);
              list.push({
                title: item.title,
                id: item.id,
                checkbox: true,
                checked: isEnabled
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_streaming'),
              items: list,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selectedItem) {
                try {
                  var key = selectedItem.id;
                  var isEnabled = getStoredSetting(key, true);
                  setStoredSetting(key, !isEnabled);
                  selectedItem.checked = !isEnabled;
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showStreamingSelectionMenu:', e);
          }
        };
        var showMoviesByGenreSelectionMenu = function (previousController) {
          try {
            var isUkrainianLanguage = Lampa.Storage.get('language') === 'uk';
            var items = [{
              title: Lampa.Lang.translate('surs_global'),
              id: 'getMoviesByGenreGlobal'
            }, {
              title: Lampa.Lang.translate('surs_russian'),
              id: 'getMoviesByGenreRus'
            }];
            if (isUkrainianLanguage) {
              items.push({
                title: Lampa.Lang.translate('surs_ukrainian'),
                id: 'getMoviesByGenreUA'
              });
            }
            var list = [];
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              var defaultValue = item.id === 'getMoviesByGenreUA' ? isUkrainianLanguage : true;
              var isEnabled = getStoredSetting(item.id, defaultValue);
              list.push({
                title: item.title,
                id: item.id,
                checkbox: true,
                checked: isEnabled
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_movies'),
              items: list,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selectedItem) {
                try {
                  var key = selectedItem.id;
                  var defaultValue = key === 'getMoviesByGenreUA' ? isUkrainianLanguage : true;
                  var isEnabled = getStoredSetting(key, defaultValue);
                  setStoredSetting(key, !isEnabled);
                  selectedItem.checked = !isEnabled;
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showMoviesByGenreSelectionMenu:', e);
          }
        };
        var showTVShowsByGenreSelectionMenu = function (previousController) {
          try {
            var isUkrainianLanguage = Lampa.Storage.get('language') === 'uk';
            var items = [{
              title: Lampa.Lang.translate('surs_global'),
              id: 'getTVShowsByGenreGlobal'
            }, {
              title: Lampa.Lang.translate('surs_russian'),
              id: 'getTVShowsByGenreRus'
            }, {
              title: Lampa.Lang.translate('surs_korean'),
              id: 'getTVShowsByGenreKOR'
            }, {
              title: Lampa.Lang.translate('surs_turkish'),
              id: 'getTVShowsByGenreTR'
            }];
            if (isUkrainianLanguage) {
              items.push({
                title: Lampa.Lang.translate('surs_ukrainian'),
                id: 'getTVShowsByGenreUA'
              });
            }
            var list = [];
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              var defaultValue = item.id === 'getTVShowsByGenreKOR' ? false : item.id === 'getTVShowsByGenreUA' ? isUkrainianLanguage : true;
              var isEnabled = getStoredSetting(item.id, defaultValue);
              list.push({
                title: item.title,
                id: item.id,
                checkbox: true,
                checked: isEnabled
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_series'),
              items: list,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selectedItem) {
                try {
                  var key = selectedItem.id;
                  var defaultValue = key === 'getTVShowsByGenreKOR' ? false : key === 'getTVShowsByGenreUA' ? isUkrainianLanguage : true;
                  var isEnabled = getStoredSetting(key, defaultValue);
                  setStoredSetting(key, !isEnabled);
                  selectedItem.checked = !isEnabled;
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showTVShowsByGenreSelectionMenu:', e);
          }
        };
        var showBestContentByGenreSelectionMenu = function (previousController) {
          try {
            var items = [{
              title: Lampa.Lang.translate('surs_movies'),
              id: 'getBestContentByGenreMovie'
            }, {
              title: Lampa.Lang.translate('surs_series'),
              id: 'getBestContentByGenreTV'
            }];
            var list = [];
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              var isEnabled = getStoredSetting(item.id, true);
              list.push({
                title: item.title,
                id: item.id,
                checkbox: true,
                checked: isEnabled
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_top_all_time'),
              items: list,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selectedItem) {
                try {
                  var key = selectedItem.id;
                  var isEnabled = getStoredSetting(key, true);
                  setStoredSetting(key, !isEnabled);
                  selectedItem.checked = !isEnabled;
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showBestContentByGenreSelectionMenu:', e);
          }
        };
        var showBestContentByPeriodSelectionMenu = function (previousController) {
          try {
            var items = [{
              title: Lampa.Lang.translate('surs_movies'),
              id: 'getBestContentByGenreAndPeriod_movie'
            }, {
              title: Lampa.Lang.translate('surs_series'),
              id: 'getBestContentByGenreAndPeriod_tv'
            }];
            var list = [];
            for (var i = 0; i < items.length; i++) {
              var item = items[i];
              var isEnabled = getStoredSetting(item.id, true);
              list.push({
                title: item.title,
                id: item.id,
                checkbox: true,
                checked: isEnabled
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_top_5_years'),
              items: list,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selectedItem) {
                try {
                  var key = selectedItem.id;
                  var isEnabled = getStoredSetting(key, true);
                  setStoredSetting(key, !isEnabled);
                  selectedItem.checked = !isEnabled;
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showBestContentByPeriodSelectionMenu:', e);
          }
        };
        var showCirillicMenu = function (previousController) {
          try {
            var key = 'cirillic';
            var currentValue = getStoredSetting(key, '1');
            var options = [{
              title: Lampa.Lang.translate('surs_cyrillic_enabled'),
              value: '1'
            }, {
              title: Lampa.Lang.translate('surs_cyrillic_disabled'),
              value: '0'
            }];
            var items = [];
            for (var i = 0; i < options.length; i++) {
              var option = options[i];
              items.push({
                title: option.title,
                value: option.value,
                checkbox: true,
                checked: currentValue === option.value
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_cyrillic'),
              items: items,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selected) {
                try {
                  setStoredSetting(key, selected.value);
                  showCirillicMenu(previousController);
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showCirillicMenu:', e);
          }
        };
        var showMinVotesMenu = function (previousController) {
          try {
            var key = 'minVotes';
            var currentValue = getStoredSetting(key, '10');
            var options = [{
              title: Lampa.Lang.translate('surs_rating_off'),
              value: '0'
            }, {
              title: Lampa.Lang.translate('surs_rating_standard'),
              value: '10'
            }, {
              title: Lampa.Lang.translate('surs_rating_enhanced'),
              value: '50'
            }, {
              title: Lampa.Lang.translate('surs_rating_maximum'),
              value: '150'
            }, {
              title: Lampa.Lang.translate('surs_rating_fatality'),
              value: '300'
            }];
            var items = [];
            for (var i = 0; i < options.length; i++) {
              var option = options[i];
              items.push({
                title: option.title,
                value: option.value,
                checkbox: true,
                checked: currentValue === option.value
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_rating_validation'),
              items: items,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selected) {
                try {
                  setStoredSetting(key, selected.value);
                  showMinVotesMenu(previousController);
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showMinVotesMenu:', e);
          }
        };
        var showAgeRestrictionsMenu = function (previousController) {
          try {
            var key = 'ageRestrictions';
            var currentValue = getStoredSetting(key, '');
            var options = [{
              title: Lampa.Lang.translate('surs_age_toddlers'),
              value: '0+'
            }, {
              title: Lampa.Lang.translate('surs_age_6'),
              value: '6+'
            }, {
              title: Lampa.Lang.translate('surs_age_12'),
              value: '12+'
            }, {
              title: Lampa.Lang.translate('surs_age_none'),
              value: ''
            }];
            var items = [];
            for (var i = 0; i < options.length; i++) {
              var option = options[i];
              items.push({
                title: option.title,
                value: option.value,
                checkbox: true,
                checked: currentValue === option.value
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_age_restriction'),
              items: items,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selected) {
                try {
                  setStoredSetting(key, selected.value);
                  showAgeRestrictionsMenu(previousController);
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showAgeRestrictionsMenu:', e);
          }
        };
        var showKeywordFilterMenu = function (previousController) {
          try {
            var key = 'without_keywords';
            var currentValue = getStoredSetting(key, '1');
            var options = [{
              title: Lampa.Lang.translate('surs_exclude_off'),
              value: '0'
            }, {
              title: Lampa.Lang.translate('surs_exclude_soft'),
              value: '1'
            }, {
              title: Lampa.Lang.translate('surs_exclude_strong'),
              value: '2'
            }];
            var items = [];
            for (var i = 0; i < options.length; i++) {
              var option = options[i];
              items.push({
                title: option.title,
                value: option.value,
                checkbox: true,
                checked: currentValue === option.value
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate('surs_exclude_asian'),
              items: items,
              onBack: function () {
                try {
                  Lampa.Controller.toggle(previousController || 'settings');
                } catch (e) {
                  console.error('Error in onBack:', e);
                }
              },
              onCheck: function (selectedItem) {
                try {
                  setStoredSetting(key, selectedItem.value);
                  showKeywordFilterMenu(previousController);
                } catch (e) {
                  console.error('Error in onCheck:', e);
                }
              }
            });
          } catch (e) {
            console.error('Error in showKeywordFilterMenu:', e);
          }
        };
        var currentSource = Lampa.Storage.get('source');
        var sourceName = Lampa.Storage.get('surs_name') || Lampa.Lang.translate('surs_source_name');
        var sourceNameKids = sourceName + ' ' + Lampa.Lang.translate('surs_source_name_kids').split(' ')[1];
        var sourceNameRus = sourceName + ' ' + Lampa.Lang.translate('surs_source_name_rus').split(' ')[1];
        var sourceNameNew = sourceName + ' ' + Lampa.Lang.translate('surs_source_name_new').split(' ')[1];

        // Создание объекта для значений выбора источника
        var sourceValues = {};
        sourceValues[sourceName] = sourceName;
        sourceValues[sourceNameNew] = sourceNameNew;
        sourceValues[sourceNameKids] = sourceNameKids;
        sourceValues[sourceNameRus] = sourceNameRus;
        Lampa.SettingsApi.addComponent({
          component: 'surs',
          name: Lampa.Lang.translate('surs_collections') + ' ' + sourceName,
          icon: '<svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style> <g> <path class="st0" d="M443.724,166.599c27.038-2.293,47.087-26.07,44.786-53.125c-2.292-27.038-26.078-47.087-53.115-44.795 c-27.038,2.301-47.078,26.088-44.776,53.124C392.91,148.85,416.677,168.9,443.724,166.599z"></path> <path class="st0" d="M431.752,346.544l30.541-114.485c5.068-19.305-6.466-39.075-25.78-44.144 c-19.304-5.077-39.075,6.448-44.152,25.771v-0.018L365.052,315.64l-78.755-13.276c-17.218-4.304-34.696,5.786-39.578,22.864 l-33.317,133.445c-3.82,13.342,3.913,27.28,17.274,31.1c13.37,3.81,27.298-3.923,31.128-17.283l39.392-98.638l61.286,16.155 C398.863,400.125,421.633,382.927,431.752,346.544z"></path> <path class="st0" d="M388.177,462.949l-0.121-0.01c-0.018,0-0.028,0-0.047,0L388.177,462.949z"></path> <path class="st0" d="M498.349,286.311c-10.1-2.999-20.721,2.749-23.722,12.858l-27.876,93.848 c-2.096,6.606-4.536,11.777-7.146,15.746c-3.987,5.944-8.002,9.373-13.854,12.093c-5.842,2.664-14.031,4.379-25.416,4.37 c-3.009,0.008-6.215-0.113-9.634-0.355l-54.009-3.363c-10.519-0.661-19.575,7.341-20.227,17.861 c-0.662,10.518,7.342,19.574,17.86,20.226l53.73,3.345c4.211,0.298,8.31,0.448,12.28,0.456c10.072-0.009,19.5-0.988,28.369-3.289 c13.268-3.392,25.315-10.127,34.501-19.892c9.251-9.736,15.531-21.885,19.91-35.609l0.074-0.214l28.015-94.362 C514.206,299.923,508.447,289.302,498.349,286.311z"></path> <path class="st0" d="M248.974,81.219L0,21.256v15.14v281.228l248.974-59.962V81.219z M225.123,238.87L23.851,287.355V51.536 l201.272,48.466V238.87z"></path> <polygon class="st0" points="204.989,115.189 47.991,84.937 47.991,253.953 204.989,223.692 "></polygon> </g> </g></svg>'
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: '',
            type: 'title'
          },
          field: {
            name: Lampa.Lang.translate('surs_collections') + ' ' + Lampa.Lang.translate('surs_from') + ' ' + sourceName,
            description: Lampa.Lang.translate('surs_main_update')
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_empty1',
            type: 'title'
          },
          field: {
            name: Lampa.Lang.translate('surs_settings_interface'),
            description: ''
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_setSource',
            type: 'select',
            values: sourceValues,
            default: sourceName
          },
          field: {
            name: Lampa.Lang.translate('surs_set_as_source'),
            description: Lampa.Lang.translate('surs_source_description')
          },
          onChange: function (value) {
            try {
              console.log('[DEBUG SURS] Выбранный источник:', value);
              Lampa.Storage.set('source', value);
            } catch (e) {
              console.error('Error in setSource onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_setButtons',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_add_to_menu'),
            description: Lampa.Lang.translate('surs_menu_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showButtonsSelectionMenu(currentController);
            } catch (e) {
              console.error('Error in setButtons onChange:', e);
            }
          }
        });
        var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 48 48">' + '<circle cx="24" cy="24" r="20" fill="white"/>' + '</svg>';
        setTimeout(addMenuButtons, 100);
        Lampa.Listener.follow('profile', function (event) {
          try {
            if (event.type !== 'changed') {
              return;
            }
            addMenuButtons();
          } catch (e) {
            console.error('Error in profile listener:', e);
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_custom_buttons',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_custom_buttons'),
            description: Lampa.Lang.translate('surs_custom_buttons_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showSelectionMenu('surs_custom_buttons', getAllButtons(), 'custom_button_', 'id', currentController);
            } catch (e) {
              console.error('Error in custom_buttons onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: '',
            type: 'title'
          },
          field: {
            name: Lampa.Lang.translate('surs_filters'),
            description: ''
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_sort_options',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_sort_types'),
            description: Lampa.Lang.translate('surs_sort_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showSelectionMenu('surs_sort_types', allSortOptions, 'sort_', 'id', currentController);
            } catch (e) {
              console.error('Error in sort_options onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_genres',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_genres'),
            description: Lampa.Lang.translate('surs_genres_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showSelectionMenu('surs_genres', allGenres, 'genre_', 'id', currentController);
            } catch (e) {
              console.error('Error in genres onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_global_streaming',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_global_streaming'),
            description: Lampa.Lang.translate('surs_global_streaming_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showSelectionMenu('surs_global_streaming', allStreamingServices, 'streaming_', 'id', currentController);
            } catch (e) {
              console.error('Error in global_streaming onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_rus_streaming',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_rus_streaming'),
            description: Lampa.Lang.translate('surs_rus_streaming_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showSelectionMenu('surs_rus_streaming', allStreamingServicesRUS, 'streaming_rus_', 'id', currentController);
            } catch (e) {
              console.error('Error in rus_streaming onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: '',
            type: 'title'
          },
          field: {
            name: Lampa.Lang.translate('surs_geo_filters'),
            description: ''
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_streaming',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_streaming'),
            description: Lampa.Lang.translate('surs_region_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showStreamingSelectionMenu(currentController);
            } catch (e) {
              console.error('Error in streaming onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_getMoviesByGenre',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_movies'),
            description: Lampa.Lang.translate('surs_region_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showMoviesByGenreSelectionMenu(currentController);
            } catch (e) {
              console.error('Error in getMoviesByGenre onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_getTVShowsByGenre',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_series'),
            description: Lampa.Lang.translate('surs_region_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showTVShowsByGenreSelectionMenu(currentController);
            } catch (e) {
              console.error('Error in getTVShowsByGenre onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_getBestContentByGenre',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_top_all_time'),
            description: Lampa.Lang.translate('surs_top_content_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showBestContentByGenreSelectionMenu(currentController);
            } catch (e) {
              console.error('Error in getBestContentByGenre onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_best_content',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_top_5_years'),
            description: Lampa.Lang.translate('surs_top_content_description')
          },
          onChange: function () {
            try {
              var currentController = Lampa.Controller.enabled().name;
              showBestContentByPeriodSelectionMenu(currentController);
            } catch (e) {
              console.error('Error in best_content onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: '',
            type: 'title'
          },
          field: {
            name: Lampa.Lang.translate('surs_technical_settings'),
            description: ''
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_cirillic',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_cyrillic'),
            description: Lampa.Lang.translate('surs_cyrillic_description')
          },
          onChange: function () {
            try {
              var previousController = Lampa.Controller.enabled().name;
              showCirillicMenu(previousController);
            } catch (e) {
              console.error('Error in cirillic onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_minVotes',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_rating_validation'),
            description: Lampa.Lang.translate('surs_rating_description')
          },
          onChange: function () {
            try {
              var previousController = Lampa.Controller.enabled().name;
              showMinVotesMenu(previousController);
            } catch (e) {
              console.error('Error in minVotes onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_ageRestrictions',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_age_restriction'),
            description: Lampa.Lang.translate('surs_age_description')
          },
          onChange: function () {
            try {
              var previousController = Lampa.Controller.enabled().name;
              showAgeRestrictionsMenu(previousController);
            } catch (e) {
              console.error('Error in ageRestrictions onChange:', e);
            }
          }
        });
        Lampa.SettingsApi.addParam({
          component: 'surs',
          param: {
            name: 'surs_withoutKeywords',
            type: 'button'
          },
          field: {
            name: Lampa.Lang.translate('surs_exclude_asian'),
            description: Lampa.Lang.translate('surs_exclude_asian_description')
          },
          onChange: function () {
            try {
              var previousController = Lampa.Controller.enabled().name;
              showKeywordFilterMenu(previousController);
            } catch (e) {
              console.error('Error in withoutKeywords onChange:', e);
            }
          }
        });
        if (!Lampa.Storage.get('surs_disableCustomName')) {
          Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
              name: '',
              type: 'title'
            },
            field: {
              name: Lampa.Lang.translate('surs_name'),
              description: ''
            }
          });
          Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
              name: 'surs_setName',
              type: 'button'
            },
            field: {
              name: Lampa.Lang.translate('surs_rename_selections'),
              description: Lampa.Lang.translate('surs_rename_description') + ' ' + currentSource
            },
            onChange: function () {
              var currentName = Lampa.Storage.get('surs_name') || '';
              Lampa.Input.edit({
                free: true,
                title: Lampa.Lang.translate('surs_enter_new_name'),
                value: currentName
                // nosave: true — больше не нужен и даже мешает
              }, function (newName) {
                // ← сюда приходит строка!
                if (typeof newName === 'string') {
                  newName = newName.trim();
                }
                if (newName && newName.length > 0) {
                  Lampa.Storage.set('surs_name', newName);
                  Lampa.Noty.show(Lampa.Lang.translate('surs_name_saved') || 'Название сохранено');
                  setTimeout(function () {
                    return Lampa.Controller.toggle('settings');
                  }, 300);
                  setTimeout(function () {
                    try {
                      softRefresh(newName, false);
                    } catch (e) {}
                  }, 2000);
                  setTimeout(function () {
                    return location.reload();
                  }, 3500);
                } else {
                  Lampa.Noty.show(Lampa.Lang.translate('surs_name_not_entered') || 'Название не введено');
                }
              });
            }
          });
        }
      } catch (e) {
        console.error('Error in addSettingMenu:', e);
      }
    }

    // Фикс главной страницы
    function addMainButton() {
      return; // Keep the native Lampa Home button.
      // Проверка наличия Lampa API
      if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.Lang || !Lampa.Activity) {
        console.error('Lampa API is not available');
        return;
      }
      try {
        // Найти существующую кнопку
        var mainButton = $('.menu__item[data-action="main"]');
        var menuList = $('.menu .menu__list').eq(0);

        // Проверка наличия списка меню
        if (!menuList.length) {
          console.error('Menu list not found');
          return;
        }

        // Создание новой кнопки
        var homeIcon = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><path fill="currentColor" d="M475.425,200.225L262.092,4.669c-6.951-6.359-17.641-6.204-24.397,0.35L36.213,200.574c-3.449,3.348-5.399,7.953-5.399,12.758v280.889c0,9.819,7.958,17.778,17.778,17.778h148.148c9.819,0,17.778-7.959,17.778-17.778v-130.37h82.963v130.37c0,9.819,7.958,17.778,17.778,17.778h148.148c9.819,0,17.778-7.953,17.778-17.778V213.333C481.185,208.349,479.099,203.597,475.425,200.225z M445.629,476.444H333.037v-130.37c0-9.819-7.959-17.778-17.778-17.778H196.741c-9.819,0-17.778,7.959-17.778,17.778v130.37H66.37V220.853L250.424,42.216l195.206,178.939V476.444z"></path></svg>';
        var button = $('<li class="menu__item selector" data-action="custom-main">' + '<div class="menu__ico">' + homeIcon + '</div>' + '<div class="menu__text">' + Lampa.Lang.translate('title_main') + '</div>' + '</li>');

        // Добавление обработчика события
        button.on('hover:enter', function () {
          try {
            Lampa.Activity.push({
              source: Lampa.Storage.get('source'),
              title: Lampa.Lang.translate('title_main') + ' - ' + Lampa.Storage.get('source'),
              component: 'main',
              page: 1
            });
          } catch (e) {
            console.error('Error in button hover:enter:', e);
          }
        });
        if (mainButton.length) {
          mainButton.before(button);
          mainButton.remove();
        } else {
          menuList.append(button);
        }
      } catch (e) {
        console.error('Error in addMainButton:', e);
      }
    }

    //локализация

    // Добавление переводов
    Lampa.Lang.add({
      surs_vote_count_desc: {
        ru: "Много голосов",
        en: "Most Votes",
        uk: "Багато голосів"
      },
      surs_vote_average_desc: {
        ru: "Высокий рейтинг",
        en: "High Rating",
        uk: "Високий рейтинг"
      },
      surs_first_air_date_desc: {
        ru: "Новинки",
        en: "New Releases",
        uk: "Новинки"
      },
      surs_popularity_desc: {
        ru: "Популярные",
        en: "Popular",
        uk: "Популярні"
      },
      surs_revenue_desc: {
        ru: "Интерес зрителей",
        en: "Audience Interest",
        uk: "Інтерес глядачів"
      },
      surs_genre_action: {
        ru: "боевики",
        en: "action",
        uk: "бойовики"
      },
      surs_genre_comedy: {
        ru: "комедии",
        en: "comedies",
        uk: "комедії"
      },
      surs_genre_drama: {
        ru: "драмы",
        en: "dramas",
        uk: "драми"
      },
      surs_genre_romance: {
        ru: "мелодрамы",
        en: "romance",
        uk: "мелодрами"
      },
      surs_genre_animation: {
        ru: "анимация",
        en: "animations",
        uk: "мультфільми"
      },
      surs_genre_kids: {
        ru: "детское",
        en: "kids",
        uk: "дитяче"
      },
      surs_genre_adventure: {
        ru: "приключения",
        en: "adventures",
        uk: "пригоди"
      },
      surs_genre_crime: {
        ru: "криминал",
        en: "crime",
        uk: "кримінал"
      },
      surs_genre_mystery: {
        ru: "детективы",
        en: "mysteries",
        uk: "детективи"
      },
      surs_genre_sci_fi: {
        ru: "фантастика",
        en: "sci-fi",
        uk: "фантастика"
      },
      surs_genre_western: {
        ru: "вестерны",
        en: "westerns",
        uk: "вестерни"
      },
      surs_genre_thriller: {
        ru: "триллеры",
        en: "thrillers",
        uk: "трилери"
      },
      surs_genre_family: {
        ru: "семейные",
        en: "family",
        uk: "сімейні"
      },
      surs_genre_fantasy: {
        ru: "фэнтези",
        en: "fantasy",
        uk: "фентезі"
      },
      surs_genre_reality: {
        ru: "реалити-шоу",
        en: "reality shows",
        uk: "реаліті-шоу"
      },
      surs_genre_action_adventure: {
        ru: "боевики и приключения",
        en: "action & adventure",
        uk: "бойовики та пригоди"
      },
      surs_genre_soap: {
        ru: "мыльные оперы",
        en: "soap operas",
        uk: "мильні опери"
      },
      surs_genre_talk_show: {
        ru: "ток-шоу",
        en: "talk shows",
        uk: "ток-шоу"
      },
      surs_title_trend_week: {
        ru: "Тренды недели",
        en: "Trending This Week",
        uk: "Тренди тижня"
      },
      surs_title_upcoming_episodes: {
        ru: "Ближайшие эпизоды",
        en: "Upcoming Episodes",
        uk: "Найближчі епізоди"
      },
      surs_popular_persons: {
        ru: "Популярные персоны",
        en: "Popular Persons",
        uk: "Популярні персони"
      },
      surs_top_movies: {
        ru: "Топ фильмы",
        en: "Top Movies",
        uk: "Топ фільми"
      },
      surs_top_tv: {
        ru: "Топ сериалы",
        en: "Top TV Shows",
        uk: "Топ серіали"
      },
      surs_for_period: {
        ru: " за ",
        en: " for ",
        uk: " за "
      },
      surs_noname: {
        ru: "без названия",
        en: "no name",
        uk: "без назви"
      },
      surs_tv_shows: {
        ru: "сериалы",
        en: "TV shows",
        uk: "серіали"
      },
      surs_on: {
        ru: "на",
        en: "on",
        uk: "на"
      },
      surs_source_name: {
        ru: "SURS",
        en: "SURS",
        uk: "SURS"
      },
      surs_source_name_kids: {
        ru: "SURS KIDS",
        en: "SURS KIDS",
        uk: "SURS KIDS"
      },
      surs_source_name_rus: {
        ru: "SURS RUS",
        en: "SURS RUS",
        uk: "SURS RUS"
      },
      surs_source_name_new: {
        ru: "SURS NEW",
        en: "SURS NEW",
        uk: "SURS NEW"
      },
      surs_collections: {
        ru: "Главная",
        en: "Main",
        uk: "Головна"
      },
      surs_main_update: {
        ru: "После изменения настроек обновите главную страницу, нажав на её иконку в боковом меню",
        en: "After changing settings, refresh the main page by clicking its icon in the side menu",
        uk: "Після зміни налаштувань оновіть головну сторінку, натиснувши на її іконку в бічному меню"
      },
      surs_from: {
        ru: "от",
        en: "from",
        uk: "від"
      },
      surs_settings_interface: {
        ru: "Настройка интерфейса",
        en: "Interface Settings",
        uk: "Налаштування інтерфейсу"
      },
      surs_set_as_source: {
        ru: "Установить в качестве источника",
        en: "Set as Source",
        uk: "Встановити як джерело"
      },
      surs_source_description: {
        ru: "Влияет на отображение контента на главной странице",
        en: "Affects content display on the main page",
        uk: "Впливає на відображення контенту на головній сторінці"
      },
      surs_add_to_menu: {
        ru: "Добавить подборки в боковое меню",
        en: "Add collections to the side menu",
        uk: "Додати підбірки до бічного меню"
      },
      surs_menu_description: {
        ru: "Выберите, какие подборки добавить в боковое меню",
        en: "Choose which collections to add to the side menu",
        uk: "Виберіть, які підбірки додати до бічного меню"
      },
      surs_select_menu_sources: {
        ru: "Выбор источников для бокового меню",
        en: "Select sources for the side menu",
        uk: "Вибір джерел для бічного меню"
      },
      surs_filters: {
        ru: "Фильтры",
        en: "Filters",
        uk: "Фільтри"
      },
      surs_sort_types: {
        ru: "Виды сортировки подборок",
        en: "Types of selection sorting",
        uk: "Типи сортування підбірок"
      },
      surs_sort_description: {
        ru: "Выбор сортировки подборок",
        en: "Choose sorting for collections",
        uk: "Вибір сортування для підбірок"
      },
      surs_genres: {
        ru: "Жанры",
        en: "Genres",
        uk: "Жанри"
      },
      surs_genres_description: {
        ru: "Выбор жанров",
        en: "Choose genres",
        uk: "Вибір жанрів"
      },
      surs_global_streaming: {
        ru: "Глобальные стриминги",
        en: "Global streaming services",
        uk: "Глобальні стрімінгові сервіси"
      },
      surs_global_streaming_description: {
        ru: "Выбор глобальных стриминговых сервисов",
        en: "Choose global streaming services",
        uk: "Вибір глобальних стрімінгових сервісів"
      },
      surs_rus_streaming: {
        ru: "Российские стриминги",
        en: "Russian streaming services",
        uk: "Російські стрімінгові сервіси"
      },
      surs_rus_streaming_description: {
        ru: "Выбор российских стриминговых сервисов",
        en: "Choose Russian streaming services",
        uk: "Вибір російських стрімінгових сервісів"
      },
      surs_geo_filters: {
        ru: "Настройки подборок",
        en: "Collection settings",
        uk: "Налаштування підбірок"
      },
      surs_streaming: {
        ru: "Стриминги",
        en: "Streaming services",
        uk: "Стрімінгові сервіси"
      },
      surs_region_description: {
        ru: "Выберите регион",
        en: "Choose region",
        uk: "Виберіть регіон"
      },
      surs_movies: {
        ru: "Фильмы",
        en: "Movies",
        uk: "Фільми"
      },
      surs_series: {
        ru: "Сериалы",
        en: "Series",
        uk: "Серіали"
      },
      surs_top_all_time: {
        ru: "Топ за все время",
        en: "Top of all time",
        uk: "Топ за весь час"
      },
      surs_top_content_description: {
        ru: "Фильмы, сериалы, или всё вместе",
        en: "Movies, series, or both",
        uk: "Фільми, серіали або все разом"
      },
      surs_top_5_years: {
        ru: "Топ за 5 лет",
        en: "Top for 5 years",
        uk: "Топ за 5 років"
      },
      surs_technical_settings: {
        ru: "Технические настройки",
        en: "Technical settings",
        uk: "Технічні налаштування"
      },
      surs_cyrillic: {
        ru: "Кириллица в карточке",
        en: "Cyrillic in card",
        uk: "Кирилиця в картці"
      },
      surs_cyrillic_description: {
        ru: "Фильтрует контент, оставляя только те материалы, у которых есть перевод названия или описание на кириллице",
        en: "Filters content, keeping only materials with titles or descriptions translated into Cyrillic",
        uk: "Фільтрує контент, залишаючи лише матеріали з перекладом назви або опису на кирилицю"
      },
      surs_cyrillic_enabled: {
        ru: "Включен",
        en: "Enabled",
        uk: "Увімкнено"
      },
      surs_cyrillic_disabled: {
        ru: "Выключен",
        en: "Disabled",
        uk: "Вимкнено"
      },
      surs_rating_validation: {
        ru: "Валидация рейтинга",
        en: "Rating validation",
        uk: "Валідація рейтингу"
      },
      surs_rating_description: {
        ru: "Позволяет исключить контент с случайно завышенной оценкой. Однако может также исключить новые фильмы или те, у которых ещё нет рейтинга или мало голосов",
        en: "Excludes content with accidentally inflated ratings. May also exclude new movies or those with no rating or few votes",
        uk: "Виключає контент із випадково завищеним рейтингом. Може також виключити нові фільми або ті, у яких ще немає рейтингу чи мало голосів"
      },
      surs_rating_off: {
        ru: "Выключено",
        en: "Off",
        uk: "Вимкнено"
      },
      surs_rating_standard: {
        ru: "Стандартная",
        en: "Standard",
        uk: "Стандартна"
      },
      surs_rating_enhanced: {
        ru: "Усиленная",
        en: "Enhanced",
        uk: "Посилена"
      },
      surs_rating_maximum: {
        ru: "Максимальная",
        en: "Maximum",
        uk: "Максимальна"
      },
      surs_rating_fatality: {
        ru: "Фаталити",
        en: "Fatality",
        uk: "Фаталіті"
      },
      surs_age_restriction: {
        ru: "Возрастное ограничение",
        en: "Age restriction",
        uk: "Вікове обмеження"
      },
      surs_age_description: {
        ru: "Формирует подборки, которые соответствуют указанному возрастному рейтингу",
        en: "Creates collections that match the specified age rating",
        uk: "Формує підбірки, які відповідають вказаному віковому рейтингу"
      },
      surs_age_toddlers: {
        ru: "Для самых маленьких",
        en: "For toddlers",
        uk: "Для найменших"
      },
      surs_age_6: {
        ru: "Для детей не старше 6 лет",
        en: "For children up to 6 years",
        uk: "Для дітей до 6 років"
      },
      surs_age_12: {
        ru: "Для детей не старше 12 лет",
        en: "For children up to 12 years",
        uk: "Для дітей до 12 років"
      },
      surs_age_none: {
        ru: "Без ограничений",
        en: "No restrictions",
        uk: "Без обмежень"
      },
      surs_exclude_asian: {
        ru: "Исключение азиатских жанров",
        en: "Exclude Asian genres",
        uk: "Виключення азійських жанрів"
      },
      surs_exclude_asian_description: {
        ru: "Мягкий режим: исключает мангу, маньхву, донхуа. Сильный режим: дополнительно исключает аниме",
        en: "Soft mode: excludes manga, manhwa, donghua. Strong mode: additionally excludes anime",
        uk: "М’який режим: виключає мангу, манхву, донхуа. Сильний режим: додатково виключає аніме"
      },
      surs_exclude_off: {
        ru: "Выключено",
        en: "Off",
        uk: "Вимкнено"
      },
      surs_exclude_soft: {
        ru: "Мягко",
        en: "Soft",
        uk: "М’яко"
      },
      surs_exclude_strong: {
        ru: "Сильно",
        en: "Strong",
        uk: "Сильно"
      },
      surs_name: {
        ru: "Название",
        en: "Name",
        uk: "Назва"
      },
      surs_rename_selections: {
        ru: "Переименование подборок",
        en: "Rename collections",
        uk: "Перейменування підбірок"
      },
      surs_rename_description: {
        ru: "Введите свое название вместо",
        en: "Enter your name instead of",
        uk: "Введіть свою назву замість"
      },
      surs_enter_new_name: {
        ru: "Введите новое название",
        en: "Enter new name",
        uk: "Введіть нову назву"
      },
      surs_name_saved: {
        ru: "Название сохранено. Обновление...",
        en: "Name saved. Updating...",
        uk: "Назва збережена. Оновлення..."
      },
      surs_name_not_entered: {
        ru: "Название не введено",
        en: "Name not entered",
        uk: "Назва не введена"
      },
      surs_global: {
        ru: "Глобальные",
        en: "Global",
        uk: "Глобальні"
      },
      surs_russian: {
        ru: "Российские",
        en: "Russian",
        uk: "Російські"
      },
      surs_korean: {
        ru: "Южнокорейские",
        en: "South Korean",
        uk: "Південнокорейські"
      },
      surs_turkish: {
        ru: "турецкие",
        en: "Turkish",
        uk: "турецькі"
      },
      surs_ukrainian: {
        ru: "украинские",
        en: "Ukrainian",
        uk: "українські"
      },
      surs_custom_buttons: {
        ru: "Горизонтальное меню",
        en: "Horizontal Menu",
        uk: "Горизонтальне меню"
      },
      surs_custom_buttons_description: {
        ru: "Выберите, какие кнопки отображать в интерфейсе",
        en: "Choose which buttons to display in the interface",
        uk: "Виберіть, які кнопки відображати в інтерфейсі"
      },
      surs_main: {
        ru: "Главная",
        en: "Main",
        uk: "Головна"
      },
      surs_bookmarks: {
        ru: "Избранное",
        en: "Bookmarks",
        uk: "Обране"
      },
      surs_select: {
        ru: "Разделы",
        en: "Sections",
        uk: "Розділи"
      },
      surs_new: {
        ru: "Новинки",
        en: "New",
        uk: "Новинки"
      },
      surs_rus: {
        ru: "Русское",
        en: "Russian",
        uk: "Російське"
      },
      surs_kids: {
        ru: "Детское",
        en: "Kids",
        uk: "Дитяче"
      },
      surs_history: {
        ru: "История",
        en: "History",
        uk: "Історія"
      }
    });
    if (window.appready) {
      add();
      startProfileListener();
      addMainButton();
      if (!Lampa.Storage.get('surs_disableMenu')) {
        addSettingMenu();
      }
    } else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {
          add();
          startProfileListener();
          addMainButton();
          if (!Lampa.Storage.get('surs_disableMenu')) {
            addSettingMenu();
          }
        }
      });
    }
  }
  if (!window.plugin_surs_ready) startPlugin();
})();

(function () {
  'use strict';

  // SVG иконки для кнопок  
  var buttonIcons = {
    surs_select: '<svg fill="#ffffff" width="64px" height="64px" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.9981689,11.9995104 C33.4659424,11.9985117 34.998291,13.1328 34.998291,16.1348 L34.998291,16.1348 L34.998291,26 C34.998291,27.5134277 36.3779053,28.1114014 36.9779053,28.3114014 L36.9779053,28.3114014 L43.8,30.8 C46.7,31.9 48.5,35 47.7,38.2 L47.7,38.2 L44.5,48.5995 C44.3,49.3995 43.6,49.9995 42.7,49.9995 L42.7,49.9995 L26.6,49.9995 C25.8,49.9995 25.1,49.5995 24.8,48.8995 C20.9318685,39.9190553 18.7869873,34.9395752 18.3653564,33.9610596 C17.9437256,32.9825439 18.2219401,32.1955241 19.2,31.6 C21,30.3 23.7,31.6395508 24.8,33.5395508 L24.8,33.5395508 L26.4157715,35.7431828 C27.0515137,36.9508 29,36.9508 29,35.1508 L29,35.1508 L29,16.1348 C29,13.1328 30.5303955,12.0005117 31.9981689,11.9995104 Z M46,2 C48.2,2 50,3.8 50,6 L50,6 L50,21 C50,22.882323 48.1813389,25.0030348 46,25 L46,25 L40.010437,25 C39,25 39,24.1881157 39,24.059082 L39,15.5 C39,11.6547018 37.0187988,8 32,8 C26.9812012,8 25,11.1879783 25,15.5 L25,15.5 L25,24.059082 C25,24.4078007 24.7352295,25 23.987793,25 L23.987793,25 L6,25 C3.8,25 2,23.2 2,21 L2,21 L2,6 C2,3.8 3.8,2 6,2 L6,2 Z"></path> </g></svg>',
    surs_new: '<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 31.603 31.603" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M7.703,15.973c0,0,5.651-5.625,5.651-10.321C13.354,2.53,10.824,0,7.703,0S2.052,2.53,2.052,5.652 C2.052,10.614,7.703,15.973,7.703,15.973z M4.758,5.652c0-1.628,1.319-2.946,2.945-2.946s2.945,1.318,2.945,2.946 c0,1.626-1.319,2.944-2.945,2.944S4.758,7.278,4.758,5.652z"></path> <path d="M28.59,7.643l-0.459,0.146l-2.455,0.219l-0.692,1.106l-0.501-0.16l-1.953-1.76l-0.285-0.915l-0.377-0.977L20.639,4.2 l-1.446-0.283L19.159,4.58l1.418,1.384l0.694,0.817l-0.782,0.408l-0.636-0.188l-0.951-0.396l0.033-0.769l-1.25-0.514L17.27,7.126 l-1.258,0.286l0.125,1.007l1.638,0.316l0.284-1.609l1.353,0.201l0.629,0.368h1.011l0.69,1.384l1.833,1.859l-0.134,0.723 l-1.478-0.189l-2.553,1.289l-1.838,2.205l-0.239,0.976h-0.661l-1.229-0.566l-1.194,0.566l0.297,1.261l0.52-0.602l0.913-0.027 l-0.064,1.132l0.757,0.22l0.756,0.85l1.234-0.347l1.41,0.222l1.636,0.441l0.819,0.095l1.384,1.573l2.675,1.574l-1.729,3.306 l-1.826,0.849l-0.693,1.889l-2.643,1.765l-0.282,1.019c6.753-1.627,11.779-7.693,11.779-14.95 C31.194,13.038,30.234,10.09,28.59,7.643z"></path> <path d="M17.573,24.253l-1.12-2.078l1.028-2.146l-1.028-0.311l-1.156-1.159l-2.56-0.573l-0.85-1.779v1.057h-0.375l-1.625-2.203 c-0.793,0.949-1.395,1.555-1.47,1.629L7.72,17.384l-0.713-0.677c-0.183-0.176-3.458-3.315-5.077-7.13 c-0.966,2.009-1.52,4.252-1.52,6.63c0,8.502,6.891,15.396,15.393,15.396c0.654,0,1.296-0.057,1.931-0.135l-0.161-1.864 c0,0,0.707-2.77,0.707-2.863C18.28,26.646,17.573,24.253,17.573,24.253z"></path> <path d="M14.586,3.768l1.133,0.187l2.75-0.258l0.756-0.834l1.068-0.714l1.512,0.228l0.551-0.083 c-1.991-0.937-4.207-1.479-6.553-1.479c-1.096,0-2.16,0.128-3.191,0.345c0.801,0.875,1.377,1.958,1.622,3.163L14.586,3.768z M16.453,2.343l1.573-0.865l1.009,0.582l-1.462,1.113l-1.394,0.141L15.55,2.907L16.453,2.343z"></path> </g> </g> </g></svg>',
    surs_rus: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 260 166" enable-background="new 0 0 260 166" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polygon points="243.199,112.566 235.896,102.51 227.168,100.247 223.726,106.665 218.71,106.395 217.235,85.568 223.332,72.563 228.373,69.98 223.431,56.336 226.922,47.976 230.807,50.312 238.625,65.851 242.928,68.949 258,72.66 245.928,52.033 238.675,52.77 233.659,48.344 233.683,36.961 227.856,22.331 220.406,17.831 217.456,12.299 221.586,6.57 214.407,2.096 213.079,9.152 203.589,19.134 200.368,28.871 201.622,33.937 192.918,42.984 190.509,49.598 185.001,50.065 178.043,56.213 179.149,61.277 172.757,70.006 168.134,64.99 162.848,69.367 150.112,72.047 149.907,72.438 148.416,62.924 143.646,63.269 128.598,69.857 125.328,75.882 119.059,76.397 115.789,80.21 109.789,80.799 105.954,76.102 96.684,85.691 79.646,76.725 56.386,71.48 52.477,73.423 57.05,63.785 57.02,63.678 59.853,70.62 67.205,70.448 65.262,54.836 59.632,54.393 45.814,64.792 44.634,68.629 33.865,71.063 29.046,69.39 20.465,75.242 21.817,80.947 13.9,98.182 17.539,110.624 7.95,113.598 2,114.238 2.86,125.154 10.409,138.333 12.179,145.783 18.104,135.087 21.227,134.227 26.489,135.456 26.71,124.883 32.217,122.007 46.052,124.576 59.036,138.117 66.737,131.522 86.678,135.309 91.005,143.52 96.611,142.611 104.11,156.01 114.068,157.928 121.985,163.904 132.975,158.445 147.063,160.633 149.866,151.88 158.054,153.158 162.529,156.355 172.535,154.143 180.625,154.314 187.435,147.257 196.434,145.783 198.081,141.529 198.647,128.915 206.638,125.424 216.62,131.62 224.832,129.137 228.299,131.522 233.167,123.777 236.585,128.768 239.855,141.676 244.034,140.053 246.272,134.055 "></polygon><text x="130" y="125" font-family="Arial, sans-serif" font-size="47" font-weight="bold" fill="black" text-anchor="middle">NEW</text></g></svg>',
    surs_kids: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M213,163v-48l8.2-2.8l29.1,37.8L213,163z M176.5,55.5c0-25.8-20.9-46.7-46.7-46.7S83.1,29.7,83.1,55.5s20.9,46.7,46.7,46.7 C155.6,102.3,176.5,81.3,176.5,55.5z M203.7,135.5c-2.4-9.9-12.4-16-22.4-13.5l-35.1,8.6c0,0-47-28.4-47.8-28.8 c-16.9-7.7-37.2-1.1-46.3,15.4l-34.3,62.4c-6.9,12.6-5.5,27.5,2.4,38.4c0.2,0.3,30.4,34.9,30.4,34.9H27.5 c-11.4,0-20.4,9.7-19.4,21.3C9,284.4,17.8,292,28,292h66.5c5.7,0,14.5-2.6,18.7-12c4-8.8,0.6-17.4-4.5-23l-31.5-36.1l36.7-66.7 l19.8,12c3.7,2.2,9.6,3.2,14,2.1c10.7-2.5,42.5-10.4,42.5-10.4C200.1,155.5,206.1,145.5,203.7,135.5z M268.5,222l-7.6-23H214 l-7.6,23H268.5z M272.5,234h-70.1l-7.6,23h85.4L272.5,234z M284.1,269h-93.4l-7.6,23h108.7L284.1,269z"></path> </g></svg>'
  };
  function getAllButtons() {
    var baseButtons = [{
      id: 'surs_main',
      title: 'surs_main'
    }, {
      id: 'surs_bookmarks',
      title: 'surs_bookmarks'
    }, {
      id: 'surs_history',
      title: 'surs_history'
    }, {
      id: 'surs_select',
      title: 'surs_select'
    }, {
      id: 'surs_new',
      title: 'surs_btns_new'
    }, {
      id: 'surs_rus',
      title: 'surs_btns_rus'
    }, {
      id: 'surs_kids',
      title: 'surs_kids'
    }, {
      id: 'surs_settings',
      title: 'title_settings'
    }];
    var externalButtons = window.surs_external_buttons || [];
    var result = [];
    for (var i = 0; i < Math.min(3, baseButtons.length); i++) {
      result.push(baseButtons[i]);
    }
    for (var j = 0; j < externalButtons.length; j++) {
      result.push(externalButtons[j]);
    }
    for (var k = 3; k < baseButtons.length - 1; k++) {
      result.push(baseButtons[k]);
    }
    result.push(baseButtons[baseButtons.length - 1]);
    return result;
  }
  var buttonActions = {
    surs_main: function () {
      Lampa.Activity.push({
        source: Lampa.Storage.get('source'),
        title: Lampa.Lang.translate('title_main'),
        component: 'main',
        page: 1
      });
    },
    surs_bookmarks: function () {
      Lampa.Activity.push({
        url: '',
        title: Lampa.Lang.translate('surs_bookmarks'),
        component: 'bookmarks',
        page: 1
      });
    },
    surs_history: function () {
      Lampa.Activity.push({
        url: '',
        title: Lampa.Lang.translate('surs_history'),
        component: 'favorite',
        type: 'history',
        page: 1
      });
    },
    surs_select: function () {
      if (window.SursSelect && typeof window.SursSelect.showSursSelectMenu === 'function') {
        window.SursSelect.showSursSelectMenu();
      }
    },
    surs_new: function () {
      var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
      Lampa.Activity.push({
        source: sourceName + ' NEW',
        title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' NEW',
        component: 'main',
        page: 1
      });
    },
    surs_rus: function () {
      var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
      Lampa.Activity.push({
        source: sourceName + ' RUS',
        title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' RUS',
        component: 'main',
        page: 1
      });
    },
    surs_kids: function () {
      var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
      Lampa.Activity.push({
        source: sourceName + ' KIDS',
        title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' KIDS',
        component: 'main',
        page: 1
      });
    },
    surs_settings: function () {
      Lampa.Controller.toggle('settings');
    }
  };

  // Функции для работы с настройками  
  function getAllStoredSettings() {
    return Lampa.Storage.get('surs_settings') || {};
  }
  function getProfileSettings() {
    var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';
    var allSettings = getAllStoredSettings();
    if (!allSettings.hasOwnProperty(profileId)) {
      allSettings[profileId] = {};
      saveAllStoredSettings(allSettings);
    }
    return allSettings[profileId];
  }
  function saveAllStoredSettings(settings) {
    Lampa.Storage.set('surs_settings', settings);
  }
  function getStoredSetting(key, defaultValue) {
    var profileSettings = getProfileSettings();
    return profileSettings.hasOwnProperty(key) ? profileSettings[key] : defaultValue;
  }

  // Функция для добавления внешней кнопки  
  function addExternalButton(buttonData) {
    if (!window.surs_external_buttons) {
      window.surs_external_buttons = [];
    }
    var button = {
      id: buttonData.id || 'external_' + Date.now(),
      title: buttonData.title || 'External Button',
      icon: buttonData.icon || '',
      action: buttonData.action || function () {}
    };
    window.surs_external_buttons.push(button);

    // Обновляем отображение кнопок если плагин уже инициализирован  
    if (window.plugin_custom_buttons_ready) {
      refreshButtons();
    }
  }

  // Функция для удаления внешней кнопки по ID  
  function removeExternalButton(buttonId) {
    if (window.surs_external_buttons) {
      for (var i = 0; i < window.surs_external_buttons.length; i++) {
        if (window.surs_external_buttons[i].id === buttonId) {
          window.surs_external_buttons.splice(i, 1);
          if (window.plugin_custom_buttons_ready) {
            refreshButtons();
          }
          break;
        }
      }
    }
  }

  // Функция для очистки всех внешних кнопок  
  function clearExternalButtons() {
    window.surs_external_buttons = [];
    if (window.plugin_custom_buttons_ready) {
      refreshButtons();
    }
  }

  // Функция для обновления отображения кнопок  
  function refreshButtons() {
    // Обновляем контент-ряд с кнопками  
    Lampa.ContentRows.call('surs_buttons', {}, []);
  }

  // Функция для получения всех внешних кнопок  
  function getExternalButtons() {
    return window.surs_external_buttons || [];
  }
  function addStyles() {
    Lampa.Template.add('custom_buttons_compact_style', "  \n        <style>  \n        .card--button-compact {  \n            width: 12.75em !important;  \n        }  \n        .items-line {  \n            padding-bottom: 0.5em !important;  \n        }  \n        @media screen and (max-width: 767px) {  \n            .card--button-compact {  \n                width: 9em !important;  \n            }  \n            .items-line {  \n                padding-bottom: 0.3em !important;  \n            }  \n            .card__svg-icon {  \n                position: absolute;  \n                top: 45% !important;\n                left: 50%;  \n                transform: translate(-50%, -50%);  \n                width: 40% !important;  \n                height: 40% !important;  \n                display: flex;  \n                align-items: center;  \n                justify-content: center;  \n            }  \n            .card__button-label {  \n                position: absolute;  \n                bottom: 0.5em !important;\n                left: 0;  \n                right: 0;  \n                text-align: center;  \n                color: #fff;  \n                padding: 0.4em !important;  \n                font-size: 0.8em !important;  \n                font-weight: 400 !important;  \n                z-index: 1;  \n            }  \n        }  \n        .card--button-compact .card__view {  \n            padding-bottom: 56% !important;  \n            display: flex;  \n            align-items: center;  \n            justify-content: center;  \n            background-color: rgba(0, 0, 0, 0.2);  \n            border-radius: 1em;  \n        }  \n        .card--button-compact.hover .card__view, .card--button-compact.focus .card__view {  \n            background-color: rgba(255, 255, 255, 0.1);  \n        }  \n        .card--button-compact .card__title, .card--button-compact .card__age {  \n            display: none !important;  \n        }  \n        .card__svg-icon {  \n            position: absolute;  \n            top: 45%;  \n            left: 50%;  \n            transform: translate(-50%, -50%);  \n            width: 40% !important;  \n            height: 40% !important;  \n            display: flex;  \n            align-items: center;  \n            justify-content: center;  \n        }  \n        .card__svg-icon svg {  \n            width: 100% !important;  \n            height: 100% !important;  \n            //fill: currentColor;  \n        }  \n        .card__svg-icon svg[fill=\"none\"], .card__svg-icon svg[fill=\"transparent\"] {  \n            fill: transparent !important;  \n        }  \n        .card__button-label {  \n            position: absolute;  \n            bottom: 0.4em;  \n            left: 0;  \n            right: 0;  \n            text-align: center;  \n            color: #fff;  \n            padding: 0.5em;  \n            font-size: 1.0em;  \n            font-weight: 400;  \n            z-index: 1;  \n        }  \n        </style>  \n    ");
    $('body').append(Lampa.Template.get('custom_buttons_compact_style', {}, true));
  }
  function createCard(data, type) {
    return Lampa.Maker.make(type, data, function (module) {
      return module.only('Card', 'Callback');
    });
  }

  // Добавление кнопок  

  function addCustomButtonsRow(partsData) {
    partsData.unshift(function (callback) {
      var allButtons = getAllButtons();
      var enabledButtons = allButtons.filter(function (b) {
        return getStoredSetting('custom_button_' + b.id, true);
      }).map(function (b) {
        var cardData = {
          source: 'custom',
          title: Lampa.Lang.translate(b.title),
          name: Lampa.Lang.translate(b.title),
          id: b.id,
          params: {
            createInstance: function () {
              var card = createCard(this, 'Card');

              // Используем спрайты для стандартных иконок  
              if (b.id === 'surs_main') {
                card.data.icon_svg = '<svg><use xlink:href="#sprite-home"></use></svg>';
              } else if (b.id === 'surs_bookmarks') {
                card.data.icon_svg = '<svg><use xlink:href="#sprite-favorite"></use></svg>';
              } else if (b.id === 'surs_history') {
                card.data.icon_svg = '<svg><use xlink:href="#sprite-history"></use></svg>';
              } else if (b.id === 'surs_settings') {
                card.data.icon_svg = '<svg><use xlink:href="#sprite-settings"></use></svg>';
              } else if (buttonIcons[b.id]) {
                card.data.icon_svg = buttonIcons[b.id];
              } else if (b.icon) {
                // Используем внешнюю иконку  
                card.data.icon_svg = b.icon;
              }
              return card;
            },
            emit: {
              onCreate: function () {
                this.html.addClass('card--button-compact');
                var imgElement = this.html.find('.card__img');
                var svgContainer = document.createElement('div');
                svgContainer.classList.add('card__svg-icon');

                // Используем иконку из данных карточки или напрямую из объекта кнопки  
                if (this.data.icon_svg) {
                  svgContainer.innerHTML = this.data.icon_svg;
                } else if (b.icon) {
                  // Прямое использование иконки для внешних кнопок  
                  svgContainer.innerHTML = b.icon;
                } else {
                  // Fallback для стандартных иконок  
                  if (b.id === 'surs_main') {
                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-home"></use></svg>';
                  } else if (b.id === 'surs_bookmarks') {
                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-favorite"></use></svg>';
                  } else if (b.id === 'surs_history') {
                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-history"></use></svg>';
                  } else if (b.id === 'surs_settings') {
                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-settings"></use></svg>';
                  } else if (buttonIcons[b.id]) {
                    svgContainer.innerHTML = buttonIcons[b.id];
                  }
                }
                imgElement.replaceWith(svgContainer);
                var buttonLabel = document.createElement('div');
                buttonLabel.classList.add('card__button-label');
                buttonLabel.innerText = Lampa.Lang.translate(b.title);
                this.html.find('.card__view').append(buttonLabel);
              },
              onlyEnter: function () {
                // Вызываем действие кнопки  
                if (b.id && buttonActions[b.id]) {
                  buttonActions[b.id]();
                } else if (b.action && typeof b.action === 'function') {
                  b.action();
                }
              }
            }
          }
        };
        return cardData;
      });
      callback({
        results: enabledButtons,
        title: '',
        params: {
          items: {
            view: 20,
            mapping: 'line'
          }
        }
      });
    });
  }
  function startPlugin() {
    window.plugin_custom_buttons_ready = true;
    addStyles();

    // Экспортируем функции для использования в других плагинах  
    window.surs_getAllButtons = getAllButtons;
    window.surs_getCustomButtonsRow = function (partsData) {
      addCustomButtonsRow(partsData);
    };

    // Экспортируем новые функции для работы с внешними кнопками  
    window.surs_addExternalButton = addExternalButton;
    window.surs_removeExternalButton = removeExternalButton;
    window.surs_clearExternalButtons = clearExternalButtons;
    window.surs_getExternalButtons = getExternalButtons;

    // Используем подход из рабочего примера  
    Lampa.ContentRows.add({
      index: 0,
      name: 'surs_buttons',
      title: 'Навигационное меню',
      screen: ['main'],
      call: function (params, screen) {
        var partsData = [];
        addCustomButtonsRow(partsData);
        return function (callback) {
          if (partsData.length > 0) {
            partsData[0](callback);
          }
        };
      }
    });

    // Отправляем уведомление о готовности плагина  
    Lampa.Listener.send('custom_buttons', {
      type: 'ready'
    });
  }
  Lampa.Lang.add({
    surs_btns_new: {
      ru: 'Новинки Мир',
      uk: 'Новинки Світ',
      en: 'New Globe'
    },
    surs_btns_rus: {
      ru: 'Новинки Россия',
      uk: 'Новинки Росія',
      en: 'New Russia '
    }
  });

  // Проверяем версию Lampa и инициализируем плагин  
  if (Lampa.Manifest.app_digital >= 300) {
    if (window.appready) {
      startPlugin();
    } else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') startPlugin();
      });
    }
  }
})();

/*
// пример добавления внешней кнопки вашего плагина в SURS Buttons  

window.surs_addExternalButton({  
    id: 'my_custom_button',  
    title: 'Моя кнопка',  
    icon: '<svg fill="#ffffff" width="64px" height="64px" viewBox="0 0 24 24">...</svg>',  
    action: function() {  
        console.log('Нажата внешняя кнопка');  
        // Ваш код здесь  
    }  
});  
  
// Удаление внешней кнопки  
window.surs_removeExternalButton('my_custom_button');  
  
// Получение всех внешних кнопок  
var externalButtons = window.surs_getExternalButtons();  
console.log(externalButtons);  
  
// Очистка всех внешних кнопок  
window.surs_clearExternalButtons();

*/

(function () {
  'use strict';

  if (window.streaming_buttons_ready) return;
  window.streaming_buttons_ready = true;

  // ====================== КОНСТАНТЫ ======================  
  var BASE_PARAMS = '&without_keywords=346488,158718,41278,196034,272265,13141,345822,315535,290667,323477,290609';
  var THREE_YEARS_AGO = new Date();
  THREE_YEARS_AGO.setFullYear(THREE_YEARS_AGO.getFullYear() - 3);
  var DATE_FILTER = '&first_air_date.gte=' + THREE_YEARS_AGO.toISOString().split('T')[0];

  // ====================== СЕРВИСЫ ======================  
  var globalStreaming = [{
    id: 213,
    title: 'Netflix'
  }, {
    id: 2739,
    title: 'Disney+'
  }, {
    id: 2552,
    title: 'Apple TV+'
  }, {
    id: 1024,
    title: 'Amazon Prime Video'
  }, {
    id: 3186,
    title: 'Max'
  }, {
    id: 4330,
    title: 'Paramount+'
  }, {
    id: 3353,
    title: 'Peacock'
  }, {
    id: 453,
    title: 'Hulu'
  }, {
    id: 49,
    title: 'HBO'
  }, {
    id: 318,
    title: 'Starz'
  }, {
    id: 2,
    title: 'ABC'
  }, {
    id: 6,
    title: 'NBC'
  }, {
    id: 19,
    title: 'FOX'
  }, {
    id: 67,
    title: 'Showtime'
  }, {
    id: 88,
    title: 'FX'
  }, {
    id: 174,
    title: 'AMC'
  }];
  var russianStreaming = [{
    id: 3827,
    title: 'Кинопоиск HD'
  }, {
    id: 2493,
    title: 'Start'
  }, {
    id: 3923,
    title: 'ИВИ'
  }, {
    id: 3871,
    title: 'Okko'
  }, {
    id: 4085,
    title: 'KION'
  }, {
    id: 2859,
    title: 'Premier'
  }, {
    id: 5806,
    title: 'Wink'
  }, {
    id: 3882,
    title: 'More.TV'
  }, {
    id: 412,
    title: 'Россия 1'
  }, {
    id: 558,
    title: 'Первый канал'
  }, {
    id: 806,
    title: 'СТС'
  }, {
    id: 1191,
    title: 'ТНТ'
  }, {
    id: 3031,
    title: 'Пятница!'
  }];

  // ====================== ДОБАВЛЕНИЕ ЛОКАЛИЗАЦИИ ======================  
  function addLocalization() {
    Lampa.Lang.add({
      surs_strmngs_global_title: {
        ru: 'Глобальные стриминги',
        en: 'Global Streaming',
        uk: 'Глобальні стрімінги'
      },
      surs_strmngs_russian_title: {
        ru: 'Российские стриминги',
        en: 'Russian Streaming',
        uk: 'Російські стрімінги'
      },
      surs_strmngs_new: {
        ru: 'Новинки',
        en: 'New',
        uk: 'Новинки'
      },
      surs_strmngs_top_rated: {
        ru: 'Высокий рейтинг',
        en: 'Top Rated',
        uk: 'Високий рейтинг'
      },
      surs_strmngs_popular: {
        ru: 'Популярные',
        en: 'Popular',
        uk: 'Популярні'
      },
      surs_strmngs_most_voted: {
        ru: 'Много голосов',
        en: 'Most Voted',
        uk: 'Багато голосів'
      }
    });
  }

  // ====================== ОБЩИЕ ФУНКЦИИ ======================  
  function getAllGlobalButtons() {
    return globalStreaming.map(function (s) {
      return {
        id: 'streaming_' + s.id,
        title: s.title,
        service: s
      };
    });
  }
  function getAllRussianButtons() {
    return russianStreaming.map(function (s) {
      return {
        id: 'streaming_' + s.id,
        title: s.title,
        service: s
      };
    });
  }

  // ====================== ПРЯМОЙ ЗАПРОС К TMDB ======================  
  function getLogoUrl(networkId, name, callback) {
    var apiUrl = Lampa.TMDB.api('network/' + networkId + '?api_key=' + Lampa.TMDB.key());
    Lampa.Network.silent(apiUrl, function (data) {
      var imgUrl = data && data.logo_path ? Lampa.TMDB.image('t/p/w154' + data.logo_path) : '';
      callback(imgUrl);
    }, function () {
      callback('');
    }, false, {
      cache: {
        life: 60 * 24 * 7
      }
    });
  }

  // ====================== ОТКРЫТИЕ СЕРВИСА ======================  
  function openStreamingService(service) {
    var sorts = [{
      title: Lampa.Lang.translate('surs_strmngs_new'),
      sort: 'first_air_date.desc',
      params: BASE_PARAMS + DATE_FILTER + (globalStreaming.includes(service) ? '&vote_count.gte=10' : '')
    }, {
      title: Lampa.Lang.translate('surs_strmngs_top_rated'),
      sort: 'vote_average.desc',
      params: BASE_PARAMS + '&vote_count.gte=10'
    }, {
      title: Lampa.Lang.translate('surs_strmngs_popular'),
      sort: 'popularity.desc',
      params: BASE_PARAMS + '&vote_count.gte=10'
    }, {
      title: Lampa.Lang.translate('surs_strmngs_most_voted'),
      sort: 'vote_count.desc',
      params: BASE_PARAMS + '&vote_count.gte=30'
    }];
    var items = sorts.map(function (s) {
      return {
        title: s.title,
        action: function () {
          Lampa.Activity.push({
            url: 'discover/tv?with_networks=' + service.id + s.params,
            title: service.title + ' — ' + s.title,
            component: 'category_full',
            card_type: 'true',
            sort_by: s.sort,
            page: 1
          });
        }
      };
    });
    Lampa.Select.show({
      title: service.title,
      items: items,
      onSelect: function (i) {
        i.action();
      },
      onBack: function () {
        Lampa.Controller.toggle('content');
      }
    });
  }

  // ====================== СОЗДАНИЕ КАРТОЧКИ ======================  
  function createCard(data, type) {
    return Lampa.Maker.make(type, data, function (module) {
      return module.only('Card', 'Callback');
    });
  }

  // ====================== ДОБАВЛЕНИЕ ГЛОБАЛЬНЫХ КНОПОК ======================  
  function addGlobalStreamingRow(globalStreamingData) {
    globalStreamingData.unshift(function (callback) {
      var allButtons = getAllGlobalButtons();
      var enabledButtons = allButtons.map(function (b) {
        var cardData = {
          source: 'custom',
          title: b.title,
          name: b.title,
          id: b.id,
          params: {
            createInstance: function () {
              var card = createCard(this, 'Card');
              return card;
            },
            emit: {
              onCreate: function () {
                this.html.addClass('streaming-card--button-compact');
                var imgElement = this.html.find('.card__img');
                var svgContainer = document.createElement('div');
                svgContainer.classList.add('streaming-card__svg-icon');
                getLogoUrl(b.service.id, b.title, function (logo) {
                  if (logo) {
                    svgContainer.innerHTML = '<img src="' + logo + '" style="width:100%;height:100%;object-fit:contain;">';
                  } else {
                    svgContainer.innerHTML = '<div style="color:#fff;font-size:1.2em;font-weight:700;text-align:center;">' + b.title + '</div>';
                  }
                });
                imgElement.replaceWith(svgContainer);
              },
              onlyEnter: function () {
                openStreamingService(b.service);
              }
            }
          }
        };
        return cardData;
      });
      callback({
        results: enabledButtons,
        title: Lampa.Lang.translate('surs_strmngs_global_title'),
        params: {
          items: {
            view: 20,
            mapping: 'line'
          }
        }
      });
    });
  }

  // ====================== ДОБАВЛЕНИЕ РОССИЙСКИХ КНОПОК ======================  
  function addRussianStreamingRow(rusStreamingData) {
    rusStreamingData.unshift(function (callback) {
      var allButtons = getAllRussianButtons();
      var enabledButtons = allButtons.map(function (b) {
        var cardData = {
          source: 'custom',
          title: b.title,
          name: b.title,
          id: b.id,
          params: {
            createInstance: function () {
              var card = createCard(this, 'Card');
              return card;
            },
            emit: {
              onCreate: function () {
                this.html.addClass('streaming-card--button-compact');
                var imgElement = this.html.find('.card__img');
                var svgContainer = document.createElement('div');
                svgContainer.classList.add('streaming-card__svg-icon');
                getLogoUrl(b.service.id, b.title, function (logo) {
                  if (logo) {
                    svgContainer.innerHTML = '<img src="' + logo + '" style="width:100%;height:100%;object-fit:contain;">';
                  } else {
                    svgContainer.innerHTML = '<div style="color:#fff;font-size:1.2em;font-weight:700;text-align:center;">' + b.title + '</div>';
                  }
                });
                imgElement.replaceWith(svgContainer);
              },
              onlyEnter: function () {
                openStreamingService(b.service);
              }
            }
          }
        };
        return cardData;
      });
      callback({
        results: enabledButtons,
        title: Lampa.Lang.translate('surs_strmngs_russian_title'),
        params: {
          items: {
            view: 20,
            mapping: 'line'
          }
        }
      });
    });
  }

  // ====================== СТИЛИ ======================  
  function addStyles() {
    Lampa.Template.add('streaming_buttons_compact_style', "\n<style>\n    .streaming-card--button-compact {\n        width: 12.75em !important;\n    }\n    .items-line {\n        padding-bottom: 0.5em !important;\n    }\n    @media screen and (max-width: 767px) {\n        .streaming-card--button-compact {\n            width: 9em !important;\n        }\n        .items-line {\n            padding-bottom: 0.1em !important;\n        }\n        .streaming-card__svg-icon {\n            width: 60% !important;\n            height: 60% !important;\n            top: 50% !important;\n            left: 50% !important;\n            transform: translate(-50%, -50%) !important;\n        }\n    }\n\n    .streaming-card--button-compact .card__view {\n        padding-bottom: 56% !important;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        background-color: rgba(200, 200, 200, 0.18);\n        border-radius: 1em;\n        transition: background-color 0.18s ease;\n    }\n\n    .streaming-card--button-compact.hover .card__view,\n    .streaming-card--button-compact.focus .card__view,\n    .streaming-card--button-compact:hover .card__view,\n    .streaming-card--button-compact:focus .card__view {\n        background-color: rgba(240, 240, 240, 0.35);\n    }\n\n    .streaming-card--button-compact .card__title,\n    .streaming-card--button-compact .card__age {\n        display: none !important;\n    }\n\n    .streaming-card__svg-icon {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        width: 45% !important;\n        height: 45% !important;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .streaming-card__svg-icon img,\n    .streaming-card__svg-icon div {\n        width: 100%;\n        height: 100%;\n        object-fit: contain;\n    }\n</style>\n");
    $('body').append(Lampa.Template.get('streaming_buttons_compact_style', {}, true));
  }

  // ====================== ЗАПУСК ======================  
  function startPlugin() {
    window.plugin_streaming_buttons_ready = true;
    addStyles();
    addLocalization();

    // Глобальный экспорт  
    window.streaming_getAllGlobalButtons = getAllGlobalButtons;
    window.streaming_getAllRussianButtons = getAllRussianButtons;
    window.streaming_getGlobalStreamingRow = function (globalStreamingData) {
      addGlobalStreamingRow(globalStreamingData);
    };
    window.streaming_getRussianStreamingRow = function (rusStreamingData) {
      addRussianStreamingRow(rusStreamingData);
    };

    // Регистрация рядов через ContentRows  
    Lampa.ContentRows.add({
      index: 3,
      name: 'streaming_global',
      title: Lampa.Lang.translate('surs_strmngs_global_title'),
      screen: ['main'],
      call: function (params, screen) {
        var globalStreamingData = [];
        addGlobalStreamingRow(globalStreamingData);
        return function (callback) {
          if (globalStreamingData.length > 0) {
            globalStreamingData[0](callback);
          }
        };
      }
    });
    Lampa.ContentRows.add({
      index: 7,
      name: 'streaming_russian',
      title: Lampa.Lang.translate('surs_strmngs_russian_title'),
      screen: ['main'],
      call: function (params, screen) {
        var rusStreamingData = [];
        addRussianStreamingRow(rusStreamingData);
        return function (callback) {
          if (rusStreamingData.length > 0) {
            rusStreamingData[0](callback);
          }
        };
      }
    });
  }
  if (Lampa.Manifest.app_digital >= 300) {
    if (window.appready) {
      startPlugin();
    } else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') startPlugin();
      });
    }
  }
})();

(function () {
  'use strict';

  if (window.surs_genres_buttons_ready) return;
  window.surs_genres_buttons_ready = true;
  var defaultConfig = {
    rowTitle: Lampa.Lang.translate('title_genre'),
    rowIndex: 5,
    source: 'tmdb',
    // Настройки фильтрации ключевых слов
    withoutKeywords: {
      enabled: true,
      // Включить/выключить фильтрацию
      level: '1' // Уровень: '0' (базовый), '1' (+ аниме), '2' (расширенный, отключает аниме полностью)
    }
  };
  var movieGenres = [{
    id: 28,
    title: 'filter_genre_ac',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M30 4C28.896 4 28 4.896 28 6C28 7.104 28.896 8 30 8C31.104 8 32 7.104 32 6C32 4.896 31.104 4 30 4ZM23.91 5.01599L13.757 0.285004C13.258 0.0530037 12.66 0.269005 12.428 0.768005C12.195 1.26901 12.411 1.86398 12.911 2.09698L22.746 6.67999L23.085 7.01999L19.082 11.022C18.618 10.18 18.018 9.39499 17.344 8.82999L9.345 2.12C8.556 1.46 7.31902 1.459 6.52802 2.121L6.17401 2.41901L4.48599 0H1C0.447 0 0 0.447 0 1C0 1.553 0.447 2 1 2H3.44299L10.862 12.636C11.709 13.848 12.534 16.121 12.664 17.598L13.758 30.091C13.851 31.161 14.766 32 15.841 32H20V18.997C26.609 18.951 28.932 18.305 28.977 11.506C28.983 10.687 28.564 9.669 27.981 9.086L23.91 5.01599ZM18 30H15.841C15.808 30 15.753 29.95 15.75 29.917L14.656 17.424C14.496 15.597 13.55 12.99 12.502 11.49L7.32101 4.06299L7.811 3.65201C7.864 3.60901 8.00799 3.60901 8.05899 3.65201L16.058 10.36C17.092 11.228 17.999 12.961 17.999 14.068V30H18ZM20 16.998C20 16.998 20.001 14.021 20 14H26.848C26.476 16.725 25.066 16.977 20 16.998ZM26.968 12H20.933L24.5 8.43399L26.566 10.5C26.767 10.701 26.978 11.211 26.976 11.492C26.976 11.672 26.971 11.832 26.968 12Z"/></svg>'
  }, {
    id: 12,
    title: 'filter_genre_ad',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M8 16.001C5.794 16.001 4 17.795 4 20C4 22.206 5.794 24 8 24C10.206 24 12 22.206 12 20C12 17.795 10.206 16.001 8 16.001ZM8 22C6.897 22 6 21.103 6 20C6 18.897 6.897 18.001 8 18.001C9.103 18.001 10 18.897 10 20C10 21.103 9.103 22 8 22ZM27.707 8.29199C27.316 7.90099 26.684 7.90099 26.293 8.29199L24 10.586L21.707 8.29199C21.316 7.90099 20.684 7.90099 20.293 8.29199C19.902 8.68299 19.902 9.31499 20.293 9.70599L22.586 12L20.293 14.293C19.902 14.684 19.902 15.316 20.293 15.707C20.488 15.902 20.744 16 21 16C21.256 16 21.512 15.902 21.707 15.707L24 13.414L26.293 15.707C26.488 15.902 26.744 16 27 16C27.256 16 27.512 15.902 27.707 15.707C28.098 15.316 28.098 14.684 27.707 14.293L25.414 12L27.707 9.70599C28.098 9.31499 28.098 8.68299 27.707 8.29199ZM30.442 2.552C28.506 1.784 26.227 1 24 1C21.21 1 18.309 2.21999 15.503 3.39899C12.817 4.52799 10.281 5.59399 8 5.59399C6.161 5.59399 4.085 4.86199 2.298 4.14499C2.066 4.05099 1.82999 4.004 1.59799 4.004C0.686992 4.004 0 4.73099 0 5.69299V27.1C0 28.06 0.667009 29.051 1.55301 29.407C3.61701 30.235 5.827 31.001 8 31.001C10.685 31.001 13.528 29.806 16.278 28.649C18.901 27.546 21.613 26.406 24 26.406C25.89 26.406 27.944 27.119 29.705 27.817C29.935 27.908 30.169 27.955 30.399 27.955C31.311 27.955 32 27.227 32 26.264V4.85901C32 3.89601 31.331 2.904 30.442 2.552ZM30 25.784C28.163 25.076 26.059 24.405 24 24.405C21.21 24.405 18.309 25.625 15.503 26.804C12.817 27.934 10.281 29 8 29C6.161 29 4.085 28.268 2.298 27.551C2.167 27.498 2 27.245 2 27.1V6.17899C3.935 6.93599 5.983 7.595 8 7.595C10.685 7.595 13.528 6.40001 16.278 5.24301C18.901 4.14001 21.613 3 24 3C25.89 3 27.944 3.71301 29.705 4.41101C29.835 4.46201 30 4.71299 30 4.85699V25.784ZM23 18C22.447 18 22 18.447 22 19C22 19.553 22.447 20 23 20C23.553 20 24 19.553 24 19C24 18.447 23.553 18 23 18ZM20 20C19.447 20 19 20.447 19 21C19 21.553 19.447 22 20 22C20.553 22 21 21.553 21 21C21 20.447 20.553 20 20 20ZM17 18C16.447 18 16 18.447 16 19C16 19.553 16.447 20 17 20C17.553 20 18 19.553 18 19C18 18.447 17.553 18 17 18ZM9 14C9.553 14 10 13.553 10 13C10 12.447 9.553 12 9 12C8.447 12 8 12.447 8 13C8 13.553 8.447 14 9 14ZM17 16C17 15.447 16.553 15 16 15C15.447 15 15 15.447 15 16C15 16.553 15.447 17 16 17C16.553 17 17 16.553 17 16ZM16 13C16 12.447 15.553 12 15 12C14.447 12 14 12.447 14 13C14 13.553 14.447 14 15 14C15.553 14 16 13.553 16 13ZM12 10C11.447 10 11 10.447 11 11C11 11.553 11.447 12 12 12C12.553 12 13 11.553 13 11C13 10.447 12.553 10 12 10Z"/></svg>'
  }, {
    id: 16,
    title: 'filter_genre_mv',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M31.0747 14.7325C30.5167 14.2365 29.7527 14.0346 28.9447 14.1116C29.0967 12.2086 28.9527 10.1776 28.0347 8.71458C27.3257 7.58458 26.2137 6.89952 24.8167 6.73252C24.6417 6.71152 24.4627 6.62754 24.3817 6.56254C24.3747 6.06954 24.7977 5.58857 25.8107 4.92857C26.3787 4.55857 26.6587 4.00153 26.5547 3.44053C26.4517 2.88153 25.9997 2.46657 25.3457 2.32957C23.2507 1.89257 18.2067 1.29357 15.7777 5.02757C14.4637 3.84857 12.0667 2.17354 9.16966 2.45854C8.63566 2.51054 8.17968 2.78956 7.91868 3.22556C7.63369 3.70056 7.60365 4.30758 7.83665 4.89158C8.11165 5.58058 8.1897 6.30855 8.1967 6.85655C6.6907 6.62055 4.5987 6.61055 2.9987 7.83055C1.8767 8.68455 1.2077 9.98353 1.0117 11.6905C0.959703 12.1345 1.0137 13.2256 2.5977 13.7676C2.7257 13.8116 2.85165 13.9325 2.97465 14.1065C2.19665 14.0495 1.46165 14.2545 0.922652 14.7345C0.0686524 15.4955 -0.628325 17.1145 0.908675 20.5075C1.72168 22.3075 2.60765 23.3176 3.61265 23.5956C4.16265 23.7496 4.7167 23.6786 5.2827 23.3666C7.2617 27.5266 11.2487 30.0016 15.9967 30.0016C20.7257 30.0016 24.6967 27.5486 26.7137 23.3666C27.2417 23.6716 27.8147 23.7535 28.3817 23.5965C29.3887 23.3205 30.2757 22.3105 31.0907 20.5085C32.6287 17.1115 31.9317 15.4925 31.0747 14.7325ZM4.1887 9.42558C5.3267 8.56058 7.05167 8.69052 7.97667 8.84452C8.55767 8.94352 9.12767 8.79155 9.54967 8.43455C9.94567 8.10055 10.1677 7.62352 10.1757 7.09452C10.1857 6.42052 10.1227 5.44355 9.77971 4.42655C11.9377 4.42555 13.7437 5.83356 14.6787 6.72056C15.0877 7.11056 15.5867 7.28255 16.0837 7.21055C16.5867 7.13655 17.0257 6.81555 17.3186 6.30955C18.6616 3.98655 21.6047 3.84855 23.6297 4.07755C22.9387 4.70955 22.2847 5.62554 22.4187 6.85954C22.5317 7.92454 23.5957 8.60155 24.5857 8.71855C25.4017 8.81655 25.9667 9.15555 26.3617 9.78355C27.0127 10.8215 27.0977 12.4675 26.9477 14.1045L26.5117 13.4435C25.9517 12.5945 24.7737 12.2276 23.8267 12.5986L22.8847 12.9726C22.7917 13.0116 22.5647 12.9516 22.4987 12.8686L20.4007 10.1745C20.0497 9.72454 19.5427 9.46653 19.0077 9.46653H18.9917C18.4517 9.47153 17.9427 9.73753 17.5967 10.1985L15.7957 12.5986C15.7427 12.6676 15.5497 12.7146 15.4707 12.6866L10.3077 10.4726C9.75366 10.2366 9.17171 10.2746 8.71471 10.5746C8.26171 10.8766 7.99968 11.3956 7.99968 11.9996V14.9996H5.50566C5.08066 13.5786 4.38467 12.2656 3.23167 11.8716C3.12067 11.8336 3.04469 11.7995 2.99669 11.7735C3.14569 10.6915 3.5367 9.92358 4.1887 9.42558ZM29.2697 19.6816C28.4677 21.4526 27.9137 21.6505 27.8527 21.6665C27.8277 21.6745 27.7857 21.6866 27.6667 21.6026C27.0197 21.1516 26.4727 21.1726 26.1247 21.2646C25.7827 21.3596 25.3087 21.6185 24.9927 22.3175C23.3617 25.9285 20.0827 28.0005 15.9967 28.0005C11.9137 28.0005 8.63571 25.9316 7.00371 22.3246C6.68771 21.6256 6.21265 21.3665 5.87065 21.2715C5.52265 21.1745 4.9757 21.1576 4.3297 21.6056C4.2157 21.6846 4.17165 21.6736 4.14665 21.6676C4.08465 21.6506 3.53066 21.4515 2.72966 19.6825C1.74066 17.4985 1.96266 16.4836 2.25066 16.2286C2.52366 15.9846 3.15069 16.0556 3.70769 16.3916C3.73969 16.4116 3.77665 16.4126 3.81065 16.4286C3.99465 17.2696 4.12271 18.2055 4.16771 19.0755C4.19771 19.6265 4.67166 20.0545 5.20866 20.0205C5.75466 19.9915 6.17367 19.5215 6.14567 18.9695C6.12367 18.5415 6.06865 17.8206 5.94365 16.9986H7.99968C9.10268 16.9986 9.99968 16.1016 9.99968 14.9986V12.5155L14.6877 14.5256C15.6247 14.9256 16.7887 14.6125 17.3987 13.7995L19.0137 11.6465L20.9217 14.0965C21.5327 14.8825 22.6927 15.2005 23.6237 14.8315L24.5657 14.4576C24.6397 14.4266 24.7997 14.4806 24.8417 14.5436L26.1627 16.5486C26.2517 16.6846 26.3707 16.7875 26.5017 16.8625C26.3277 17.6405 26.1387 18.3065 25.9907 18.7555C25.8167 19.2785 26.0957 19.8455 26.6147 20.0215C26.7187 20.0565 26.8257 20.0735 26.9287 20.0735C27.3417 20.0735 27.7277 19.8095 27.8667 19.3905C27.9657 19.0925 28.3637 17.8295 28.6607 16.2135C29.1037 16.0435 29.5307 16.0376 29.7447 16.2276C30.0357 16.4836 30.2587 17.4986 29.2697 19.6816ZM12.9997 18.9996C13.5527 18.9996 13.9997 18.5526 13.9997 17.9996C13.9997 17.4466 13.5527 16.9996 12.9997 16.9996C12.4467 16.9996 11.9997 17.4466 11.9997 17.9996C11.9997 18.5526 12.4467 18.9996 12.9997 18.9996ZM18.9997 18.9996C19.5527 18.9996 19.9997 18.5526 19.9997 17.9996C19.9997 17.4466 19.5527 16.9996 18.9997 16.9996C18.4467 16.9996 17.9997 17.4466 17.9997 17.9996C17.9997 18.5526 18.4467 18.9996 18.9997 18.9996ZM21.3367 20.0306C16.8487 24.0036 15.1507 24.0036 10.6627 20.0306C10.2497 19.6666 9.61666 19.7046 9.25066 20.1166C8.88465 20.5306 8.92365 21.1625 9.33665 21.5285C11.9517 23.8415 13.9767 24.9996 15.9997 24.9996C18.0227 24.9996 20.0477 23.8425 22.6627 21.5285C23.0757 21.1625 23.1147 20.5306 22.7487 20.1166C22.3837 19.7036 21.7497 19.6656 21.3367 20.0306Z"/></svg>'
  }, {
    id: 35,
    title: 'filter_genre_cm',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16 0C7.178 0 0 7.178 0 16C0 24.822 7.178 32 16 32C24.822 32 32 24.822 32 16C32 7.178 24.822 0 16 0ZM16 30C8.28 30 2 23.72 2 16C2 8.28 8.28 2 16 2C23.72 2 30 8.28 30 16C30 23.72 23.72 30 16 30ZM19.394 13.749L23.58 15.691C23.716 15.754 23.859 15.784 24 15.784C24.378 15.784 24.739 15.57 24.908 15.205C25.14 14.704 24.923 14.109 24.422 13.877L20.914 12.249L24.262 11.345C24.795 11.2 25.111 10.652 24.967 10.118C24.822 9.58398 24.268 9.27102 23.74 9.41302L19.671 10.514C18.39 10.86 18.14 11.6 18.105 12.01C18.069 12.419 18.19 13.19 19.394 13.749ZM7.09299 15.205C7.26199 15.57 7.62301 15.784 8.00101 15.784C8.14201 15.784 8.28499 15.755 8.42099 15.691L12.607 13.749C13.81 13.19 13.931 12.419 13.897 12.01C13.862 11.6 13.612 10.86 12.331 10.513L8.26199 9.41302C7.73499 9.26702 7.18 9.58298 7.035 10.118C6.891 10.651 7.20699 11.2 7.73999 11.345L11.088 12.249L7.57999 13.877C7.07799 14.109 6.85999 14.704 7.09299 15.205ZM23 17H9C7.897 17 7 17.878 7 18.957C7 19.766 7.43599 20.764 8.03699 21.331C11.163 24.278 13.469 25.984 16 25.984C18.531 25.984 20.837 24.278 23.964 21.331C24.565 20.764 25 19.766 25 18.957C25 17.878 24.103 17 23 17ZM22.592 19.876C19.414 22.871 17.627 23.984 16 23.984C14.373 23.984 12.586 22.871 9.409 19.876C9.21 19.688 9 19.216 9 19L23 18.957C23 19.216 22.79 19.688 22.592 19.876Z"/></svg>'
  }, {
    id: 80,
    title: 'filter_genre_cr',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M22 9C22.553 9 23 8.553 23 8C23 7.447 22.553 7 22 7C21.447 7 21 7.447 21 8C21 8.553 21.447 9 22 9ZM26 9C26.553 9 27 8.553 27 8C27 7.447 26.553 7 26 7C25.447 7 25 7.447 25 8C25 8.553 25.447 9 26 9ZM30 7C29.447 7 29 7.447 29 8C29 8.553 29.447 9 30 9C30.553 9 31 8.553 31 8C31 7.447 30.553 7 30 7ZM27.5 12.33C27.979 12.605 28.589 12.441 28.866 11.963C29.141 11.484 28.979 10.873 28.499 10.598C28.02 10.321 27.41 10.485 27.134 10.963C26.858 11.441 27.021 12.053 27.5 12.33ZM14.24 13H17C18.103 13 19 12.103 19 11V5C19 3.897 18.103 3 16.999 3H15.87C15.504 3 14.973 2.782 14.399 2.483C14.394 2.481 14.39 2.47801 14.385 2.47601C13.855 2.19901 13.29 1.85599 12.784 1.54599C12.54 1.39699 12.3 1.25 12.067 1.112C10.841 0.385 9.434 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16C10.431 16 12.726 14.888 14.24 13ZM15 4.87299C15.297 4.95099 15.589 5 15.87 5H17V11H15V4.87299ZM13 11.312L12.92 11.427C11.796 13.037 9.956 13.999 8 13.999C4.691 13.999 2 11.308 2 7.99899C2 4.68999 4.691 1.99899 8 1.99899C9.075 1.99899 10.129 2.28701 11.049 2.83301C11.275 2.96701 11.507 3.10799 11.743 3.25299C12.16 3.50799 12.581 3.76199 13 3.99799V11.312ZM29.102 15.972L23.906 12.972C22.982 12.441 21.705 12.784 21.174 13.704L19.795 16.095C17.402 16.462 15.292 17.894 14.076 19.999C13.008 21.85 12.723 24.005 13.277 26.069C13.83 28.132 15.153 29.858 17.004 30.926C18.22 31.628 19.602 31.998 20.998 31.998C23.851 31.998 26.508 30.465 27.933 27.997C28.649 26.757 29.019 25.346 29.003 23.918C29 23.647 28.993 23.365 28.985 23.079C28.97 22.485 28.956 21.825 28.981 21.228V21.219C29.009 20.571 29.086 19.998 29.27 19.68L29.833 18.702C30.1 18.239 30.171 17.701 30.033 17.185C29.896 16.671 29.564 16.239 29.102 15.972ZM26.199 26.998C25.131 28.85 23.137 29.999 20.997 29.999C19.95 29.999 18.915 29.721 18.003 29.194C16.615 28.393 15.623 27.099 15.208 25.551C14.793 24.002 15.006 22.386 15.808 20.998C16.786 19.304 18.538 18.191 20.496 18.022L20.633 18.01L26.969 21.668C26.963 22.148 26.973 22.64 26.986 23.127C26.993 23.404 27 23.677 27.003 23.939C27.014 25.011 26.736 26.068 26.199 26.998ZM27.537 18.682C27.396 18.926 27.293 19.203 27.211 19.5L21.905 16.437L22.905 14.705L28.099 17.707L27.537 18.682ZM8 4C5.794 4 4 5.79501 4 8.00101C4 10.206 5.794 12 8 12C10.206 12 12 10.206 12 8.00101C12 5.79501 10.206 4 8 4ZM8 10C6.897 10 6 9.10401 6 8.00101C6 6.89701 6.897 6 8 6C9.103 6 10 6.89701 10 8.00101C10 9.10401 9.103 10 8 10ZM21.102 20C18.896 20 17.102 21.795 17.102 24.001C17.102 26.206 18.896 28 21.102 28C23.308 28 25.102 26.206 25.102 24.001C25.102 21.795 23.308 20 21.102 20ZM21.102 26C19.999 26 19.102 25.104 19.102 24.001C19.102 22.897 19.999 22 21.102 22C22.205 22 23.102 22.897 23.102 24.001C23.102 25.104 22.204 26 21.102 26Z"/></svg>'
  },
  //  { id: 99, title: 'filter_genre_dc', icon: '<svg width="800px" height="800px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg"><path d="M30,19l-4,3.2V20a2.0023,2.0023,0,0,0-2-2H16a2.0023,2.0023,0,0,0-2,2v6a2.0023,2.0023,0,0,0,2,2h8a2.0023,2.0023,0,0,0,2-2V23.8L30,27ZM16,26V20h8l.0015,6Z"/><path d="M12,28H8V4h8v6a2.0058,2.0058,0,0,0,2,2h6v3l2,0V10a.9092.9092,0,0,0-.3-.7l-7-7A.9087.9087,0,0,0,18,2H8A2.0058,2.0058,0,0,0,6,4V28a2.0058,2.0058,0,0,0,2,2h4ZM18,4.4,23.6,10H18Z"/></svg>' },
  {
    id: 18,
    title: 'filter_genre_dr',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16 0C7.178 0 0 7.178 0 16C0 24.822 7.178 32 16 32C24.822 32 32 24.822 32 16C32 7.178 24.822 0 16 0ZM16 30C8.28 30 2 23.72 2 16C2 8.28 8.28 2 16 2C23.72 2 30 8.28 30 16C30 23.72 23.72 30 16 30ZM21 13.999C22.4 13.999 23.718 13.454 24.708 12.463C25.098 12.072 25.098 11.439 24.707 11.049C24.316 10.658 23.683 10.658 23.292 11.049C22.069 12.276 19.931 12.276 18.708 11.049C18.317 10.658 17.684 10.658 17.293 11.049C16.902 11.439 16.902 12.072 17.292 12.463C18.282 13.454 19.6 13.999 21 13.999ZM14.708 12.463C15.098 12.072 15.098 11.439 14.707 11.049C14.316 10.658 13.683 10.658 13.292 11.049C12.069 12.276 9.93101 12.276 8.70801 11.049C8.31701 10.658 7.68403 10.658 7.29303 11.049C6.90203 11.439 6.90199 12.072 7.29199 12.463C8.28199 13.454 9.6 13.999 11 13.999C12.4 13.999 13.718 13.454 14.708 12.463ZM25.631 19.583L24.365 16.87C23.734 15.778 22.304 15.701 21.595 16.947L20.685 18.909C16.599 17.432 13.107 17.78 8.54401 20.109C8.05301 20.36 7.85697 20.963 8.10797 21.455C8.28497 21.801 8.635 22 9 22C9.152 22 9.30898 21.965 9.45398 21.891C13.565 19.792 16.436 19.486 20.027 20.794C20.023 20.863 20 20.931 20 21C20 22.654 21.346 24 23 24C24.654 24 26 22.654 26 21C26 20.485 25.858 19.968 25.631 19.583ZM23 22C22.448 22 22 21.552 22 21C22 20.834 22.048 20.667 22.182 20.427L23 18.665L23.858 20.505C23.952 20.667 24 20.834 24 21C24 21.552 23.552 22 23 22Z"/></svg>'
  }, {
    id: 10751,
    title: 'filter_genre_fm',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M10 7.99781C12.206 7.99781 14 6.2043 14 3.9989C14 1.79351 12.206 0 10 0C7.794 0 6 1.79351 6 3.9989C6 6.2043 7.794 7.99781 10 7.99781ZM10 1.99945C11.103 1.99945 12 2.89621 12 3.9989C12 5.1016 11.103 5.99835 10 5.99835C8.897 5.99835 8 5.1016 8 3.9989C8 2.89621 8.897 1.99945 10 1.99945ZM6 19.9945C6 22.1999 7.794 23.9934 10 23.9934C12.206 23.9934 14 22.1999 14 19.9945C14 17.7891 12.206 15.9956 10 15.9956C7.794 15.9956 6 17.7891 6 19.9945ZM12 19.9945C12 21.0972 11.103 21.994 10 21.994C8.897 21.994 8 21.0972 8 19.9945C8 18.8918 8.897 17.9951 10 17.9951C11.103 17.9951 12 18.8918 12 19.9945ZM22 15.9956C23.389 15.9956 24.611 15.2838 25.329 14.2071C25.565 15.4368 26.31 16.5675 27.497 17.2553C28.777 17.9961 30.274 18.0341 31.519 17.4922C31.361 16.1496 30.582 14.8739 29.298 14.1331C28.109 13.4453 26.741 13.3714 25.556 13.7892C25.83 13.2474 25.999 12.6435 25.999 11.9967C25.999 9.79131 24.205 7.99781 21.999 7.99781C19.793 7.99781 17.999 9.79131 17.999 11.9967C17.999 14.2021 19.794 15.9956 22 15.9956ZM22 9.99726C23.103 9.99726 24 10.894 24 11.9967C24 13.0994 23.103 13.9962 22 13.9962C20.897 13.9962 20 13.0994 20 11.9967C20 10.894 20.897 9.99726 22 9.99726ZM10 25.9929C5.946 25.9929 3.99399 26.4777 3.61099 30.9135C3.56299 31.4634 3.97 31.9483 4.521 31.9953C5.081 32.0492 5.555 31.6363 5.603 31.0855C5.843 28.3112 6.29402 27.9923 9.99902 27.9923C13.704 27.9923 14.155 28.3102 14.395 31.0855C14.44 31.6063 14.876 31.9992 15.39 31.9992C15.418 31.9992 15.448 31.9983 15.477 31.9953C16.028 31.9483 16.435 31.4634 16.387 30.9135C16.006 26.4777 14.054 25.9929 10 25.9929ZM10 11.9967C12.04 11.9967 13.614 12.0747 14.667 12.4566C15.185 12.6426 15.76 12.3756 15.948 11.8567C16.136 11.3369 15.868 10.764 15.348 10.5761C14.017 10.0942 12.314 9.99726 10 9.99726C1.721 9.99726 1 11.9637 1 21.994C1 22.5468 1.447 22.9937 2 22.9937C2.553 22.9937 3 22.5468 3 21.994C3 12.2746 3.593 11.9967 10 11.9967ZM22.072 17.9951C22.002 17.9941 21.933 17.9941 21.867 17.9951C18.444 17.9951 17.177 18.7729 15.497 23.6705C15.318 24.1924 15.597 24.7612 16.119 24.9412C16.642 25.1151 17.21 24.8402 17.39 24.3193C18.876 19.9815 19.518 19.9725 21.977 19.9955C24.997 19.9745 25.375 19.9785 28.061 29.206C28.188 29.6439 28.587 29.9268 29.021 29.9268C29.113 29.9268 29.208 29.9138 29.3 29.8868C29.83 29.7329 30.135 29.178 29.981 28.6481C27.322 19.5137 26.552 17.9951 22.072 17.9951Z"/></svg>'
  }, {
    id: 14,
    title: 'filter_genre_fe',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M24.9818 19.9374C24.9428 19.1434 24.8058 18.0984 24.6448 16.8985C24.2409 13.8976 23.3999 7.65174 25.2808 7.09976C25.3378 7.08276 25.3898 7.06181 25.4408 7.03781C26.1248 7.96878 27.0528 8.99973 29.3217 8.99973C29.8747 8.99973 30.3217 8.55274 30.3217 7.99976C30.3217 6.02082 30.3217 0 23.9998 0C18.512 0 11.5262 2.42792 9.4193 13.9946C9.2813 14.7485 8.91631 15.1795 8.45332 15.7235C7.80634 16.4865 7.00037 17.4355 7.00037 19.2794C7.00037 19.3374 7.00835 19.3994 7.01135 19.4594C3.11447 22.0773 0.0515774 24.1652 0.000578963 27.1121C-0.0194204 28.2491 0.482577 28.9091 0.907564 29.2621C2.43852 30.5351 5.40442 29.9341 8.01834 29.4041C9.04431 29.1961 10.0143 28.9991 10.5603 28.9991C14.2401 28.9991 16.4221 29.8481 18.534 30.6681C20.239 31.3311 21.8499 31.957 23.9798 31.999C23.9948 31.999 24.0309 32 24.0879 32C24.8168 32 28.8307 31.9071 30.8516 29.9251C31.6026 29.1891 31.9986 28.2551 31.9986 27.2262C31.9996 23.0613 26.6778 20.6124 24.9818 19.9374ZM23.0049 20.3204C22.6799 21.2023 17.505 22.6953 12.7142 21.8474C11.3272 21.6004 9.0003 20.9384 9.0003 19.2794C9.0003 18.8295 9.07029 18.4844 9.18829 18.1854C10.6182 18.9464 12.7232 19.9984 15.8571 19.9984C18.753 19.9984 21.3489 19.5334 22.8729 18.7875C22.9489 19.4174 23.0019 19.9544 23.0049 20.3204ZM23.9998 1.99994C26.3858 1.99994 28.0387 2.86294 28.2887 6.87381C27.6417 6.67582 27.3338 6.24682 26.8848 5.62184C26.2158 4.68887 25.3818 3.52889 23.2279 3.02591C22.6819 2.89791 22.1519 3.23487 22.0269 3.77186C21.9009 4.30984 22.2359 4.84787 22.7729 4.97287C23.3019 5.09687 23.7028 5.26887 24.0268 5.47786C21.4069 7.02081 22.0049 12.2306 22.5959 16.6595C22.5339 16.6905 22.4659 16.7105 22.4089 16.7565C21.6619 17.3595 19.112 17.9995 15.8571 17.9995C13.3702 17.9995 11.6522 17.2205 10.3653 16.5465C10.7882 16.0065 11.2092 15.3295 11.3862 14.3536C12.8802 6.15582 17.1241 1.99994 23.9998 1.99994ZM29.4517 28.4971C28.1407 29.7821 25.0268 30.0201 24.0188 29.9991C22.2439 29.9651 20.8599 29.4271 19.258 28.8041C17.0811 27.9581 14.6141 26.9992 10.5603 26.9992C9.81328 26.9992 8.79631 27.2052 7.62034 27.4442C5.88539 27.7972 2.98049 28.3871 2.18652 27.7241C2.12752 27.6761 1.99251 27.5632 1.99951 27.1472C2.03051 25.3212 4.59544 23.4963 7.68534 21.4154C8.13333 22.0463 8.8433 22.6553 9.98227 23.1393C11.8292 23.9223 14.0881 24.0873 15.6591 24.0873C18.638 24.0873 22.7599 23.4573 24.3399 21.8313C26.2948 22.6123 29.9997 24.6272 29.9997 27.2262C29.9997 27.7271 29.8257 28.1311 29.4517 28.4971Z"/></svg>'
  }, {
    id: 36,
    title: 'filter_genre_hi',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M31.9878 3.10504C32.0478 2.56704 31.8778 2.03103 31.5208 1.63303C31.1608 1.23103 30.6358 0.999023 30.0828 0.999023H21.9998V4.99902H19.9998V0.999023H11.9998V4.99902H9.99979V0.999023H1.91782C1.36582 0.999023 0.842803 1.22904 0.480803 1.63104C0.124803 2.02704 -0.0462284 2.56403 0.0107716 3.10303C0.363772 6.35903 1.23676 8.79602 4.20376 9.98502C4.06176 11.682 3.99979 13.85 3.99979 17C3.99979 19.894 4.05079 21.887 4.16879 23.522C3.10379 24.686 2.51879 26.3321 2.24179 28.8921C2.18179 29.4301 2.35177 29.966 2.70877 30.364C3.06877 30.766 3.59376 30.998 4.14676 30.998H12.9928C12.9968 30.998 12.9988 31 13.0028 31C13.0068 31 13.0088 30.998 13.0128 30.998H18.9928C18.9968 30.998 18.9988 31 19.0028 31C19.0068 31 19.0088 30.998 19.0128 30.998H28.1858C28.7388 30.998 29.2628 30.767 29.6238 30.364C29.9798 29.967 30.1498 29.43 30.0908 28.894C29.7928 26.138 29.1138 24.401 27.8538 23.227C27.9568 21.648 28.0018 19.695 28.0018 16.999C28.0018 13.849 27.9398 11.681 27.7968 9.98502C30.7638 8.79802 31.6368 6.36004 31.9878 3.10504ZM17.9998 29H13.9998V23C13.9998 21.897 14.8968 21 15.9998 21C17.1028 21 17.9998 21.897 17.9998 23V29ZM26.4428 8.33902L25.6388 8.57504L25.7298 9.40704C25.9178 11.139 25.9998 13.41 25.9998 17C25.9998 19.941 25.9448 21.973 25.8208 23.587L25.7788 24.1291L26.2118 24.458C27.2658 25.262 27.8298 26.645 28.1258 29H19.9998V23C19.9998 20.794 18.2058 19 15.9998 19C13.7938 19 11.9998 20.794 11.9998 23V29H4.24277C4.49577 26.76 4.98581 25.452 5.87381 24.644L6.23776 24.313L6.19681 23.8221C6.06081 22.1771 5.99979 20.073 5.99979 17C5.99979 13.41 6.0808 11.14 6.2698 9.40604L6.36081 8.57404L5.55679 8.33804C3.26279 7.66504 2.39179 6.36203 2.01279 3.00003H7.99979V5.00003C7.99979 6.10303 8.89679 7.00003 9.99979 7.00003H11.9998C13.1028 7.00003 13.9998 6.10303 13.9998 5.00003V3.00003H17.9998V5.00003C17.9998 6.10303 18.8968 7.00003 19.9998 7.00003H21.9998C23.1028 7.00003 23.9998 6.10303 23.9998 5.00003V3.00003H29.9868C29.6088 6.36203 28.7378 7.66602 26.4428 8.33902ZM16.0018 9.00003C15.4488 9.00003 15.0018 9.44703 15.0018 10V12C15.0018 12.553 15.4488 13 16.0018 13C16.5548 13 17.0018 12.553 17.0018 12V10C17.0018 9.44703 16.5548 9.00003 16.0018 9.00003ZM11.0018 9.00003C10.4488 9.00003 10.0018 9.44703 10.0018 10V12C10.0018 12.553 10.4488 13 11.0018 13C11.5548 13 12.0018 12.553 12.0018 12V10C12.0018 9.44703 11.5548 9.00003 11.0018 9.00003ZM21.0018 9.00003C20.4488 9.00003 20.0018 9.44703 20.0018 10V12C20.0018 12.553 20.4488 13 21.0018 13C21.5548 13 22.0018 12.553 22.0018 12V10C22.0018 9.44703 21.5548 9.00003 21.0018 9.00003Z"/></svg>'
  }, {
    id: 27,
    title: 'filter_genre_ho',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16 0C8.906 0 5 4.30898 5 12.131C5 15.555 6.21602 17.65 7.28802 19.497C7.84302 20.453 8.36698 21.356 8.68298 22.376C8.97698 23.325 9.19399 24.252 9.40399 25.148C10.229 28.671 11.008 32 16.001 32C20.994 32 21.772 28.672 22.598 25.148C22.808 24.252 23.025 23.325 23.319 22.376C23.634 21.356 24.159 20.453 24.714 19.497C25.786 17.649 27.002 15.555 27.002 12.131C27 4.30898 23.094 0 16 0ZM16.033 29.711L15.672 29.586C15.254 27.567 15 23.978 15 21.534C15 19.375 15.661 18.869 15.859 18.853C15.889 18.856 16.052 18.856 16.084 18.856C16.339 18.869 17 19.375 17 21.534C17 24.684 16.567 28.173 16.033 29.711ZM22.982 18.493C22.395 19.504 21.789 20.549 21.407 21.784C21.093 22.801 20.867 23.763 20.649 24.692C20.024 27.361 19.574 28.945 18.13 29.617C18.75 27.278 18.999 23.76 18.999 21.534C18.999 19.786 18.623 18.494 17.882 17.693C17.184 16.937 16.37 16.874 16.042 16.861C16.012 16.858 15.94 16.856 15.91 16.856C15.424 16.856 12.999 17.082 12.999 21.534C12.999 23.595 13.195 27.106 13.62 29.493C12.368 28.759 11.938 27.205 11.349 24.692C11.131 23.762 10.906 22.8 10.591 21.784C10.209 20.549 9.60299 19.504 9.01599 18.493C7.97799 16.705 6.99799 15.016 6.99799 12.131C6.99799 5.40798 10.026 2 15.998 2C21.97 2 24.998 5.40798 24.998 12.131C25 15.017 24.021 16.705 22.982 18.493ZM22.664 10.997C18.687 10.241 18.648 6.15899 18.648 5.98499C18.651 5.43399 18.209 4.984 17.658 4.979H17.648C17.1 4.979 16.653 5.41999 16.648 5.96899C16.628 8.01299 17.783 12.105 22.291 12.961C22.353 12.973 22.417 12.979 22.479 12.979C22.95 12.979 23.37 12.645 23.46 12.166C23.563 11.624 23.207 11.101 22.664 10.997ZM14.223 4.98401C13.682 4.93001 13.201 5.36699 13.162 5.91699C13.152 6.06299 12.876 9.532 9.28101 11.06C8.77301 11.276 8.53599 11.863 8.75299 12.372C8.91399 12.752 9.28397 12.98 9.67297 12.98C9.80397 12.98 9.937 12.955 10.065 12.9C14.825 10.878 15.148 6.23502 15.159 6.03802C15.19 5.48802 14.772 5.01901 14.223 4.98401ZM16.902 12.423C16.689 12.121 16.338 11.988 15.993 12.021C15.648 11.989 15.298 12.122 15.084 12.423L13.67 14.423C13.351 14.874 13.458 15.498 13.909 15.817C14.084 15.941 14.286 16.001 14.485 16.001C14.798 16.001 15.108 15.854 15.302 15.578L15.992 14.601L16.682 15.578C16.876 15.853 17.186 16.001 17.499 16.001C17.698 16.001 17.9 15.941 18.075 15.817C18.526 15.499 18.634 14.875 18.314 14.423L16.902 12.423Z"/></svg>'
  },
  // { id: 10402, title: 'filter_genre_mu', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M25.7862 0.815562C24.1862 -0.4064 21.9014 -0.110414 18.7355 0.754559C10.9787 2.87849 9.99969 4.45046 9.99969 14.7731V22.4119C9.40571 22.1459 8.70674 21.9999 7.92676 21.9999C4.69586 21.9999 0 24.4928 0 28.3997C0 30.6196 1.56193 31.9996 4.07385 31.9996H4.07489C5.77184 31.9996 7.69279 31.3606 9.21475 30.2917C11.0107 29.0287 11.9996 27.3628 11.9996 25.5998V17.668C12.3506 11.9282 13.8356 11.2962 19.2634 9.81028C22.2313 8.99731 23.7693 8.91632 24.5743 9.5313C25.4242 10.1783 25.7832 11.9112 25.9212 14.3821C25.3432 14.1381 24.6742 14.0012 23.9272 14.0012C20.6963 14.0012 16.0005 16.4941 16.0005 20.401C16.0005 22.6209 17.5625 24.0009 20.0744 24.0009C21.7713 24.0009 23.6933 23.3619 25.2152 22.2929C27.0112 21.0299 28.0001 19.364 28.0001 17.6011V10.4883C27.9991 5.31043 27.6461 2.23452 25.7862 0.815562ZM8.06378 28.6557C6.88382 29.4847 5.35585 29.9997 4.07489 29.9997H4.07385C1.99991 29.9997 1.99994 28.7957 1.99994 28.3997C1.99994 25.8468 5.53983 23.9999 7.92676 23.9999C8.60374 23.9999 9.1487 24.1419 9.50069 24.4098C9.83668 24.6658 9.99969 25.0548 9.99969 25.5988C9.99969 27.0748 8.78676 28.1477 8.06378 28.6557ZM18.7355 7.88035C15.4276 8.78632 13.3596 9.59828 12.0676 11.0242C12.3446 4.83842 13.6886 4.21245 19.2624 2.6855C22.2303 1.87253 23.7682 1.79154 24.5732 2.40652C25.5162 3.1265 25.8572 5.17943 25.9592 8.10034C25.8992 8.04935 25.8492 7.98935 25.7862 7.94135C24.1873 6.71939 21.9014 7.01438 18.7355 7.88035ZM24.0633 20.656C22.8833 21.4849 21.3554 21.9999 20.0744 21.9999H20.0734C17.9994 21.9999 17.9995 20.7959 17.9995 20.4C17.9995 17.847 21.5393 16.0001 23.9263 16.0001C24.6033 16.0001 25.1482 16.1421 25.5002 16.4101C25.8362 16.6661 25.9992 17.0551 25.9992 17.599C25.9992 19.075 24.7863 20.148 24.0633 20.656Z"/></svg>' },
  {
    id: 9648,
    title: 'filter_genre_de',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M17.9805 21.9963C17.3125 21.2754 16.0545 21.0944 15.1946 21.5903L10.9137 24.0623C10.0328 24.5722 9.57577 25.7212 9.87276 26.6762C10.1388 27.5372 10.3917 28.1491 10.7217 28.7211C11.8707 30.713 13.8907 32 15.8666 32C16.6446 32 17.3705 31.809 18.0235 31.4321C20.3954 30.0631 20.9804 26.6182 19.3264 23.7513C18.9975 23.1843 18.5955 22.6593 17.9805 21.9963ZM17.0225 29.6991C16.6765 29.8981 16.2885 30.0001 15.8656 30.0001C14.5916 30.0001 13.2526 29.1051 12.4537 27.7221C12.1997 27.2812 12.0067 26.8082 11.7837 26.0852C11.7627 26.0172 11.8337 25.8402 11.9137 25.7942L16.1945 23.3223C16.2135 23.3113 16.2565 23.2983 16.3165 23.2983C16.4185 23.2983 16.4955 23.3363 16.5135 23.3563C17.0285 23.9123 17.3415 24.3162 17.5935 24.7522C18.6965 26.6622 18.4395 28.8821 17.0225 29.6991ZM14.1906 19.8974C14.9886 19.4364 15.5676 18.4434 15.5676 17.5365C15.5636 14.7475 15.3066 9.6337 13.6247 6.71879C13.4427 6.4048 13.2626 6.08282 13.0816 5.75883C11.5687 3.05991 9.85574 0 6.60284 0C5.50387 0 4.3579 0.353983 3.09794 1.08096C1.33699 2.09793 0.28403 3.7849 0.0510368 5.95883C-0.531945 11.4107 3.99992 18.7074 7.49582 21.8793C7.8998 22.2453 8.4788 22.4553 9.08378 22.4553C9.52377 22.4553 9.94274 22.3483 10.2927 22.1443L14.1906 19.8974ZM8.84081 20.3974C5.25292 17.1425 1.577 10.4997 2.03999 6.1708C2.20698 4.61385 2.87995 3.51588 4.09892 2.8129C5.03389 2.27292 5.87587 1.99994 6.60385 1.99994C8.68378 1.99994 9.97274 4.30086 11.3367 6.73579C11.5227 7.06678 11.7067 7.39676 11.8927 7.71775C13.4387 10.3977 13.5666 15.9115 13.5686 17.5365C13.5686 17.7244 13.3646 18.0645 13.1916 18.1645L9.29477 20.4124C9.23178 20.4474 8.87681 20.4294 8.84081 20.3974ZM31.8651 19.4994L28.3242 13.4916C29.0131 12.9506 29.6082 12.2806 30.0592 11.5007C31.9871 8.15776 30.8381 3.86888 27.4972 1.93894C26.4343 1.32495 25.2253 0.999969 24.0023 0.999969C21.5064 0.999969 19.1824 2.34194 17.9365 4.50188C16.0065 7.84377 17.1565 12.1316 20.4984 14.0626C21.5624 14.6765 22.7704 15.0005 23.9923 15.0005C24.8963 15.0005 25.7752 14.8196 26.5922 14.4926L30.1331 20.4994C30.3191 20.8204 30.6541 20.9994 31.0001 20.9994C31.1701 20.9994 31.3421 20.9564 31.4991 20.8654C31.9781 20.5894 32.1421 19.9784 31.8651 19.4994ZM23.9923 13.0006C23.1213 13.0006 22.2594 12.7696 21.4984 12.3296C19.1115 10.9517 18.2915 7.88877 19.6695 5.50185C20.5594 3.95889 22.2204 2.99991 24.0033 2.99991C24.8753 2.99991 25.7373 3.2319 26.4982 3.67189C28.8842 5.04984 29.7042 8.11276 28.3272 10.5007C27.4372 12.0426 25.7753 13.0006 23.9923 13.0006Z"/></svg>'
  }, {
    id: 10749,
    title: 'filter_genre_md',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M7.41498 4C9.52398 4 11.315 5.25 12.892 7.823C13.396 8.641 14.605 8.64202 15.109 7.82202C16.685 5.25002 18.476 4 20.586 4C23.248 4 26.001 6.21601 26.001 9.92401C26.001 10.597 25.902 11.306 25.706 12.029C25.562 12.562 25.878 13.111 26.411 13.256C26.943 13.397 27.492 13.084 27.638 12.551C27.879 11.656 28.001 10.773 28.001 9.92401C28.001 4.96401 24.23 2 20.586 2C18.045 2 15.834 3.30199 14.001 5.87299C12.168 3.30199 9.95702 2 7.41602 2C3.77102 2 0.000976562 4.96401 0.000976562 9.92401C0.000976562 15.378 4.972 20.815 9.229 23.814C9.405 23.937 9.60502 23.997 9.80402 23.997C10.118 23.997 10.428 23.85 10.622 23.573C10.94 23.121 10.832 22.498 10.381 22.179C6.20998 19.241 2.00098 14.312 2.00098 9.92401C1.99998 6.21601 4.75298 4 7.41498 4ZM31.266 18.214C30.556 16.963 29.374 16.038 28.025 15.677C26.356 15.228 24.634 15.638 22.983 16.885C22.175 14.969 20.912 13.771 19.218 13.318C18.784 13.202 18.335 13.143 17.882 13.143C15.34 13.143 13.161 14.896 12.462 17.505C11.594 20.746 13.326 24.257 14.436 26.062C15.744 28.188 17.808 30.539 19.222 30.917C19.431 30.973 19.664 31 19.937 31C22.792 31 30.417 27.772 31.781 22.682C32.198 21.122 32.016 19.535 31.266 18.214ZM29.849 22.164C28.757 26.24 21.952 29.001 19.937 29C19.797 29 19.741 28.985 19.741 28.985C19.257 28.855 17.595 27.378 16.139 25.013C15.199 23.483 13.719 20.539 14.394 18.022C14.927 16.033 16.53 15.142 17.882 15.142C18.16 15.142 18.436 15.177 18.7 15.248C19.972 15.589 20.862 16.633 21.422 18.441C21.601 19.016 22.078 19.388 22.639 19.387C22.967 19.387 23.291 19.254 23.555 19.011C24.949 17.72 26.227 17.264 27.507 17.607C28.343 17.831 29.079 18.412 29.527 19.2C30.016 20.062 30.13 21.115 29.849 22.164Z"/></svg>'
  }, {
    id: 878,
    title: 'filter_genre_fa',
    icon: '<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"/><path d="M8 11C8 11.5523 7.55228 12 7 12C6.44772 12 6 11.5523 6 11C6 10.4477 6.44772 10 7 10C7.55228 10 8 10.4477 8 11Z"/><path d="M18 11C18 11.5523 17.5523 12 17 12C16.4477 12 16 11.5523 16 11C16 10.4477 16.4477 10 17 10C17.5523 10 18 10.4477 18 11Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.36662 6.59895C6.88733 4.11517 9.09023 2.25 11.7288 2.25H12.2712C14.9098 2.25 17.1127 4.11517 17.6334 6.59895C18.9914 6.96685 20.1722 7.47324 21.0543 8.09778C22.0199 8.78151 22.75 9.70191 22.75 10.8262C22.75 11.6633 22.3404 12.3932 21.7409 12.9846C21.1442 13.5735 20.3191 14.0693 19.3599 14.4696C17.4384 15.2715 14.8358 15.7499 12 15.7499C9.16417 15.7499 6.56159 15.2715 4.64006 14.4696C3.68091 14.0693 2.85581 13.5735 2.25907 12.9846C1.65964 12.3932 1.25 11.6633 1.25 10.8262C1.25 9.70191 1.98006 8.78151 2.94573 8.09778C3.8278 7.47324 5.00857 6.96685 6.36662 6.59895ZM6.31758 8.1738C5.27525 8.49234 4.425 8.88832 3.81252 9.32198C3.02544 9.87927 2.75 10.4057 2.75 10.8262C2.75 11.1417 2.9 11.5098 3.31263 11.9169C3.72794 12.3267 4.36731 12.7303 5.2178 13.0853C6.91556 13.7939 9.31299 14.2499 12 14.2499C14.687 14.2499 17.0844 13.7939 18.7822 13.0853C19.6327 12.7303 20.2721 12.3267 20.6874 11.9169C21.1 11.5098 21.25 11.1417 21.25 10.8262C21.25 10.4057 20.9746 9.87927 20.1875 9.32198C19.575 8.88832 18.7247 8.49234 17.6824 8.1738C17.6121 8.39507 17.4763 8.62375 17.2285 8.79611C16.6273 9.21425 15.2456 9.75 12 9.75C8.75443 9.75 7.37265 9.21425 6.77147 8.79611C6.52367 8.62375 6.38791 8.39507 6.31758 8.1738ZM7.751 7.63868C8.13808 7.84517 9.25423 8.25 12 8.25C14.7458 8.25 15.8619 7.84517 16.249 7.63868C16.2011 5.48287 14.4385 3.75 12.2712 3.75H11.7288C9.56146 3.75 7.79889 5.48287 7.751 7.63868ZM16.2497 7.73583C16.2497 7.73582 16.2497 7.73538 16.2498 7.73451L16.2497 7.73583ZM6 16.25C6.41421 16.25 6.75 16.5858 6.75 17V20C6.75 20.4142 6.41421 20.75 6 20.75C5.58579 20.75 5.25 20.4142 5.25 20V17C5.25 16.5858 5.58579 16.25 6 16.25ZM18 16.25C18.4142 16.25 18.75 16.5858 18.75 17V20C18.75 20.4142 18.4142 20.75 18 20.75C17.5858 20.75 17.25 20.4142 17.25 20V17C17.25 16.5858 17.5858 16.25 18 16.25ZM12 17.25C12.4142 17.25 12.75 17.5858 12.75 18V21C12.75 21.4142 12.4142 21.75 12 21.75C11.5858 21.75 11.25 21.4142 11.25 21V18C11.25 17.5858 11.5858 17.25 12 17.25Z"/></svg>'
  },
  //  { id: 10770, title: 'filter_genre_tv', icon: '<svg width="800px" height="800px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 8L2 15C2 16.6569 3.34315 18 5 18H15C16.6569 18 18 16.6569 18 15V8C18 6.34315 16.6569 5 15 5H5C3.34315 5 2 6.34315 2 8ZM5 16C4.44772 16 4 15.5523 4 15V8C4 7.44771 4.44772 7 5 7H15C15.5523 7 16 7.44771 16 8V15C16 15.5523 15.5523 16 15 16H5Z"/><path d="M11.2809 5.62469C10.9359 6.05596 10.3066 6.12588 9.87531 5.78087C9.44405 5.43586 9.37413 4.80657 9.71914 4.3753L11.7191 1.8753C12.0641 1.44404 12.6934 1.37412 13.1247 1.71913C13.556 2.06414 13.6259 2.69343 13.2809 3.12469L11.2809 5.62469Z"/><path d="M8.71912 5.62469C9.06413 6.05596 9.69343 6.12588 10.1247 5.78087C10.556 5.43586 10.6259 4.80657 10.2809 4.3753L8.28086 1.8753C7.93585 1.44404 7.30656 1.37412 6.8753 1.71913C6.44404 2.06414 6.37412 2.69343 6.71912 3.12469L8.71912 5.62469Z"/></svg>' },
  {
    id: 53,
    title: 'filter_genre_tr',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M23.75 7.01001C20.298 3.55801 17.276 2.83301 15.35 2.83301C15.216 2.83301 15.09 2.83699 14.971 2.84399C14.322 2.87899 13.812 3.222 13.608 3.759C13.397 4.313 13.56 4.93099 14.045 5.41199L17.334 8.68201L16.063 9.953C16.042 9.97 16.017 9.976 15.998 9.996L13.401 12.595L13.325 12.788C13.297 12.86 13.261 12.963 13.217 13.092C12.934 13.922 12.27 15.865 10.447 17.077C9.98702 17.384 9.86203 18.004 10.168 18.464C10.361 18.754 10.679 18.91 11.002 18.91C11.192 18.91 11.385 18.856 11.555 18.743C13.943 17.154 14.79 14.673 15.11 13.738C15.115 13.725 15.119 13.714 15.123 13.702L16.407 12.417L18.917 14.925L8.44397 25.396C8.05297 25.787 8.05297 26.419 8.44397 26.81C8.63897 27.005 8.895 27.103 9.151 27.103C9.407 27.103 9.66297 27.005 9.85797 26.81L20.292 16.378C21.981 18.512 22.02 21.158 21.981 21.952L21.928 23.057L23.032 22.998C28.572 22.703 31.192 18.148 31.803 15.78L31.947 15.228L23.75 7.01001ZM23.969 20.878C23.871 19.252 23.377 16.766 21.481 14.664L17.831 11.014L20.166 8.67599L16.395 4.92899C17.809 5.17699 19.914 6.001 22.335 8.423L29.691 15.801C29.213 17.055 27.664 20.189 23.969 20.878ZM14.135 26.123C13.605 25.954 13.046 26.25 12.88 26.774C12.192 28.944 9.92502 30 5.94702 30C5.45302 30 5.20999 29.898 5.16699 29.831C4.82599 29.291 5.91902 26.983 6.50702 25.744C7.26902 24.136 7.981 22.616 7.992 21.421C8.006 19.92 7.999 15.607 7.995 12.851L8 10.529C7.995 3.43299 8.74701 2.18801 9.01801 2.00201C9.52201 2.21501 9.84198 4.81301 10.014 6.20801C10.187 7.60601 10.366 9.05301 10.711 10.342C10.855 10.876 11.403 11.193 11.936 11.049C12.47 10.906 12.787 10.358 12.643 9.82401C12.333 8.66901 12.164 7.29301 11.999 5.96301C11.62 2.89601 11.263 0 9 0C6.818 0 6.40803 3.357 6.25403 4.621C5.99703 6.724 5.999 9.106 6 10.53L6.00299 12.853C6.00699 15.602 6.014 19.905 6 21.402C5.993 22.157 5.30597 23.607 4.69897 24.887C3.59297 27.223 2.54699 29.43 3.47699 30.9C3.93799 31.629 4.76902 32 5.94702 32C10.841 32 13.814 30.445 14.786 27.378C14.953 26.852 14.661 26.29 14.135 26.123ZM4 17V1C4 0.447 3.553 0 3 0C2.447 0 2 0.447 2 1V17C2 17.553 2.447 18 3 18C3.553 18 4 17.553 4 17ZM18 21C17.447 21 17 21.447 17 22V31C17 31.553 17.447 32 18 32C18.553 32 19 31.553 19 31V22C19 21.447 18.553 21 18 21Z"/></svg>'
  }, {
    id: 10752,
    title: 'filter_genre_mi',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M12.9999 21.9967C12.9999 21.4438 13.4469 20.9969 13.9999 20.9969H17.9999C18.5529 20.9969 18.9999 21.4438 18.9999 21.9967C18.9999 22.5497 18.5529 22.9966 17.9999 22.9966H13.9999C13.4469 22.9966 12.9999 22.5497 12.9999 21.9967Z M12.9999 17.9974C12.9999 17.4445 13.4469 16.9976 13.9999 16.9976H17.9999C18.5529 16.9976 18.9999 17.4445 18.9999 17.9974C18.9999 18.5503 18.5529 18.9972 17.9999 18.9972H13.9999C13.4469 18.9972 12.9999 18.5503 12.9999 17.9974Z M12.9999 25.9961C12.9999 25.4432 13.4469 24.9963 13.9999 24.9963H17.9999C18.5529 24.9963 18.9999 25.4432 18.9999 25.9961C18.9999 26.549 18.5529 26.9959 17.9999 26.9959H13.9999C13.4469 26.9959 12.9999 26.549 12.9999 25.9961Z M11.6878 5.27249C12.9338 4.47062 14.4109 3.99969 15.9999 3.99969C20.4109 3.99969 23.9999 7.5881 23.9999 11.9984V23.9964C23.9999 28.4067 20.4109 31.9951 15.9999 31.9951C11.5889 31.9951 7.99985 28.4067 7.99985 23.9964V11.9984C7.99985 9.89773 8.81984 7.99105 10.1488 6.56128L5.28886 1.70209C4.89786 1.31115 4.89786 0.679255 5.28886 0.288319C5.67986 -0.102617 6.31186 -0.102617 6.70286 0.288319L11.6878 5.27249ZM15.9999 29.9954C19.3089 29.9954 21.9999 27.3049 21.9999 23.9964L21.9989 11.9994C21.9989 8.6909 19.3079 6.00034 15.9989 6.00034C14.9639 6.00034 13.9909 6.26435 13.1399 6.72727L14.7049 8.29098C15.0919 8.10901 15.5189 8.00001 15.9739 8.00001C17.6279 8.00001 18.9739 9.34579 18.9739 10.9995C18.9739 12.6533 17.6279 13.999 15.9739 13.999C14.3199 13.999 12.9739 12.6533 12.9739 10.9995C12.9739 10.5306 13.0919 10.0937 13.2839 9.69773L11.5619 7.97603C10.5949 9.04085 9.99985 10.4496 9.99985 11.9984V23.9964C9.99985 27.3049 12.6909 29.9954 15.9999 29.9954ZM16 11.998C16.5523 11.998 17 11.5504 17 10.9982C17 10.446 16.5523 9.99837 16 9.99837C15.4477 9.99837 15 10.446 15 10.9982C15 11.5504 15.4477 11.998 16 11.998Z M25.2929 0.298266C25.6839 -0.0926697 26.3158 -0.0926697 26.7068 0.298266C27.0978 0.688203 27.0978 1.3211 26.7068 1.71204L23.9779 4.43962C23.7829 4.63459 23.5268 4.73254 23.2708 4.73254C23.0148 4.73254 22.7589 4.63459 22.5639 4.43962C22.1729 4.04868 22.1729 3.41678 22.5639 3.02585L25.2929 0.298266Z"/></svg>'
  }, {
    id: 37,
    title: 'filter_genre_ve',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M31.528 9.758C30.823 8.864 29.37 8.802 28.237 9.508L25.007 11.179C24.975 8.80302 24.631 3.63401 22.342 1.26501C21.531 0.426015 20.557 0 19.446 0C18.513 0 17.777 0.582008 17.127 1.09601C16.743 1.40001 16.266 1.77698 16.007 1.77698C15.748 1.77698 15.271 1.40001 14.887 1.09601C14.238 0.582008 13.5 0 12.568 0C11.458 0 10.484 0.426015 9.67303 1.26501C7.38103 3.63701 7.03899 8.81699 7.00799 11.188L3.82702 9.54498C2.55002 8.75698 1.177 8.863 0.470999 9.758C0.0179991 10.33 -0.113973 11.15 0.100027 12.063C1.36803 17.463 5.69199 18.001 16 18.001C26.308 18.001 30.632 17.464 31.899 12.063C32.113 11.149 31.981 10.33 31.528 9.758ZM11.11 2.65399C11.542 2.20799 12.005 2 12.567 2C12.805 2 13.292 2.38498 13.647 2.66498C14.306 3.18598 15.053 3.776 16.006 3.776C16.96 3.776 17.707 3.18498 18.366 2.66498C18.721 2.38398 19.207 2 19.445 2C20.007 2 20.47 2.20802 20.902 2.65302C21.953 3.74002 22.5 5.92 22.77 8H9.24004C9.51104 5.922 10.058 3.74299 11.11 2.65399ZM9.05504 10H22.958C23.005 10.784 23.016 11.477 23.007 12H9.00799C8.99899 11.477 9.01004 10.784 9.05504 10ZM29.956 11.605C29.099 15.26 26.751 16 16 16C5.24899 16 2.90002 15.261 2.04302 11.605C1.95102 11.215 2.01399 11.028 2.10399 11C2.18699 11 2.418 11.024 2.846 11.285L8.096 14H23.904L29.219 11.248C29.581 11.024 29.814 11 29.964 11C29.985 11.028 30.048 11.216 29.956 11.605ZM24.158 19.787C23.627 19.656 23.081 19.985 22.948 20.52C22.61 21.899 21.11 26.397 15.999 26.397C10.888 26.397 9.38804 21.899 9.05004 20.52C8.91804 19.984 8.37602 19.655 7.84002 19.787C7.30402 19.919 6.97599 20.461 7.10699 20.997C7.88699 24.177 10.183 27.55 14.346 28.261L13.053 30.5C12.777 30.979 12.941 31.59 13.419 31.866C13.576 31.957 13.748 32 13.918 32C14.264 32 14.6 31.821 14.785 31.5L15.999 29.397L17.213 31.5C17.399 31.821 17.734 32 18.08 32C18.25 32 18.422 31.957 18.579 31.866C19.058 31.59 19.222 30.978 18.945 30.5L17.652 28.261C21.815 27.55 24.111 24.177 24.891 20.997C25.022 20.461 24.694 19.919 24.158 19.787Z"/></svg>'
  }];
  var tvGenres = [{
    id: 10759,
    title: 'filter_genre_aa',
    icon: '<svg fill="currentColor" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M15.2,31.3c0-0.6-0.5-1.1-1.1-1.1c-5.2,0-9.4,4.2-9.4,9.4c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1c0-4,3.2-7.2,7.2-7.2C14.7,32.4,15.2,31.9,15.2,31.3z"/><path d="M21.3,39.6c0,4-3.2,7.2-7.2,7.2c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1c5.2,0,9.4-4.2,9.4-9.4c0-0.6-0.5-1.1-1.1-1.1S21.3,38.9,21.3,39.6z"/><path d="M61.2,31.2C61.2,31.2,61.2,31.2,61.2,31.2L48.6,12.8c0,0-0.1-0.1-0.1-0.1c-1.4-1.5-3.3-2.3-5.3-2.3c-4,0-7.3,3.3-7.3,7.3c0,1-0.3,4.6-2,4.6h-3.7c-1.6,0-2-3.6-2-4.6c0-4-3.3-7.3-7.3-7.3c-2,0-4,0.8-5.3,2.3c0,0-0.1,0.1-0.1,0.1L2.8,31.1c0,0,0,0.1-0.1,0.1C1,33.6,0,36.5,0,39.6c0,7.8,6.3,14.1,14.1,14.1s14.1-6.3,14.1-14.1c0-7,1.9-8.4,2.2-8.6h3.3c0.4,0.3,2.2,1.8,2.2,8.6c0,7.8,6.3,14.1,14.1,14.1S64,47.3,64,39.6C64,36.5,63.1,33.7,61.2,31.2z M14.1,51.4c-6.5,0-11.9-5.3-11.9-11.9c0-2.6,0.8-5,2.3-7c0,0,0.1-0.1,0.1-0.1c2.3-3,5.7-4.8,9.5-4.8c6.5,0,11.9,5.3,11.9,11.9S20.6,51.4,14.1,51.4z M26.6,33.2c0-0.1-0.1-0.2-0.1-0.2c-0.1-0.1-0.1-0.2-0.2-0.3c-0.2-0.3-0.3-0.6-0.5-0.9c0-0.1-0.1-0.1-0.1-0.2c-0.2-0.3-0.5-0.6-0.7-1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.2-0.2-0.4-0.5-0.6-0.7c-0.1-0.1-0.1-0.2-0.2-0.2c-0.3-0.3-0.6-0.5-0.9-0.8c0,0-0.1-0.1-0.1-0.1c-0.3-0.2-0.5-0.4-0.8-0.6c-0.1-0.1-0.2-0.1-0.3-0.2c-0.3-0.2-0.6-0.4-0.9-0.6c0,0-0.1-0.1-0.1-0.1c-0.4-0.2-0.7-0.4-1.1-0.5c-0.1,0-0.2-0.1-0.3-0.1c-0.3-0.1-0.6-0.2-0.9-0.3c-0.1,0-0.2-0.1-0.3-0.1c-0.4-0.1-0.8-0.2-1.2-0.3c-0.1,0-0.2,0-0.2,0c-0.3-0.1-0.7-0.1-1-0.2c-0.1,0-0.2,0-0.3,0c-0.4,0-0.9-0.1-1.3-0.1c-0.5,0-1,0-1.6,0.1c-0.2,0-0.3,0.1-0.5,0.1c-0.3,0-0.7,0.1-1,0.2c-0.2,0-0.4,0.1-0.6,0.1c-0.3,0.1-0.6,0.2-0.9,0.3c-0.2,0.1-0.4,0.1-0.6,0.2c-0.1,0-0.2,0.1-0.3,0.1l8.5-12.4c1-1,2.3-1.6,3.7-1.6c2.8,0,5.1,2.3,5.1,5.1c0,2.2,0.7,5.8,3.1,6.6v4.9C28.3,29.7,27.3,30.8,26.6,33.2z M31.2,24.4h1.5v4.3h-1.5V24.4z M37.4,33.2c-0.7-2.4-1.7-3.6-2.4-4.1v-4.9c2.4-0.8,3.1-4.4,3.1-6.6c0-2.8,2.3-5.1,5.1-5.1c1.4,0,2.7,0.6,3.7,1.6l8.5,12.4c-0.1,0-0.2-0.1-0.4-0.1c-0.2-0.1-0.4-0.1-0.6-0.2c-0.3-0.1-0.6-0.2-0.9-0.3c-0.2,0-0.4-0.1-0.6-0.1c-0.3-0.1-0.7-0.1-1-0.2c-0.2,0-0.3-0.1-0.5-0.1c-0.5-0.1-1-0.1-1.6-0.1c-0.4,0-0.9,0-1.3,0.1c-0.1,0-0.2,0-0.3,0c-0.3,0-0.7,0.1-1,0.2c-0.1,0-0.2,0-0.2,0c-0.4,0.1-0.8,0.2-1.2,0.3c-0.1,0-0.2,0.1-0.3,0.1c-0.3,0.1-0.6,0.2-0.9,0.3c-0.1,0-0.2,0.1-0.3,0.1c-0.4,0.2-0.7,0.3-1.1,0.5c0,0-0.1,0.1-0.1,0.1c-0.3,0.2-0.6,0.4-0.9,0.6c-0.1,0.1-0.2,0.1-0.3,0.2c-0.3,0.2-0.6,0.4-0.8,0.6c0,0-0.1,0.1-0.1,0.1c-0.3,0.3-0.6,0.5-0.9,0.8c-0.1,0.1-0.1,0.2-0.2,0.2c-0.2,0.2-0.4,0.5-0.6,0.7c-0.1,0.1-0.1,0.1-0.2,0.2c-0.3,0.3-0.5,0.6-0.7,1c0,0.1-0.1,0.1-0.1,0.2c-0.2,0.3-0.4,0.6-0.5,0.9c-0.1,0.1-0.1,0.2-0.2,0.3C37.5,33.1,37.4,33.1,37.4,33.2z M49.9,51.4c-6.5,0-11.9-5.3-11.9-11.9s5.3-11.9,11.9-11.9c3.8,0,7.2,1.7,9.5,4.8c1.5,2.1,2.3,4.5,2.3,7C61.8,46.1,56.5,51.4,49.9,51.4z"/><path d="M49.9,30.2c-0.6,0-1.1,0.5-1.1,1.1c0,0.6,0.5,1.1,1.1,1.1c4,0,7.2,3.2,7.2,7.2c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1C59.3,34.4,55.1,30.2,49.9,30.2z"/><path d="M49.9,46.7c-4,0-7.2-3.2-7.2-7.2c0-0.6-0.5-1.1-1.1-1.1s-1.1,0.5-1.1,1.1c0,5.2,4.2,9.4,9.4,9.4c0.6,0,1.1-0.5,1.1-1.1C51,47.2,50.5,46.7,49.9,46.7z"/></svg>'
  },
  // Боевик и Приключения

  {
    id: 16,
    title: 'filter_genre_mv',
    icon: ''
  },
  // Мультфильм
  {
    id: 35,
    title: 'filter_genre_cm',
    icon: ''
  },
  // Комедия
  {
    id: 80,
    title: 'filter_genre_cr',
    icon: ''
  },
  // Криминал
  {
    id: 18,
    title: 'filter_genre_dr',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
  },
  // Драма

  {
    id: 10751,
    title: 'filter_genre_fm',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 2.15 2.15 0 0 1-1.7 1.2A2.1 2.1 0 0 1 18 16.5a2.1 2.1 0 0 1-1.3-.6 2.1 2.1 0 0 1-.6-1.3 2.1 2.1 0 0 1 1.2-1.9 2.15 2.15 0 0 1 1.2-.5 2.1 2.1 0 0 1 1.3.6 2.1 2.1 0 0 1 .6 1.3z"/><path d="M23 22a10 10 0 0 1-20 0"/><path d="M9 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4"/></svg>'
  },
  // Семейный

  {
    id: 10762,
    title: 'filter_genre_ch',
    icon: '<svg fill="currentColor" viewBox="0 0 24.432 24.432" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M6.42,9.301c1.771,0,3.205-1.435,3.205-3.208c0-1.105,0.389-2.117-0.465-2.691C8.648,3.053,6.4,2.888,5.736,2.888c-0.79,0-1.817,0.644-2.376,1.119C2.665,4.594,3.213,5.111,3.213,6.092C3.213,7.866,4.646,9.301,6.42,9.301z M4.186,5.779c0.589-0.107,0.989,0.087,0.989,0.087l0.984-0.479c0,0-0.501,0.724-0.051,0.479C7.11,5.53,8.231,5.67,8.801,5.782c0.02,0.125,0.038,0.253,0.038,0.386c0,1.32-1.048,2.387-2.349,2.387c-1.294,0-2.343-1.067-2.343-2.387C4.147,6.035,4.165,5.907,4.186,5.779z"/><path d="M22.066,5.643c-0.015-0.183-0.03-0.365-0.07-0.541c-0.127-1.124-1.133-3.408-4.02-3.34c-2.488,0.059-3.031,1.932-3.162,3.072c-0.088,0.28-0.145,0.573-0.164,0.878c-3.236,0.565-2.88,3.849-0.904,3.905c-0.188-1.715,0.63-2.745,0.945-3.076c0.291,1.771,1.82,3.132,3.672,3.132c1.756,0,3.222-1.223,3.619-2.858c0.303,0.534,0.812,1.628,0.688,2.803C25.783,9.591,24.251,6.032,22.066,5.643z M18.363,8.617c-1.455,0-2.639-1.172-2.672-2.621c0.531-0.193,0.925-1.113,0.925-1.113s0.315,0.108,0.315,1.147c0.551,0.192,1.508-1.614,1.508-1.614v1.423c0.607,0.166,2.521-0.054,2.521-0.054l0.071,0.06c0.001,0.03,0.009,0.061,0.009,0.092C21.042,7.415,19.842,8.617,18.363,8.617z"/><polygon points="19.143,9.769 17.568,9.769 16.253,9.769 12.402,14.409 8.675,9.827 4.438,9.827 0,14.699 0.93,15.658 4.107,12.947 4.107,18.205 4.744,18.205 4.744,22.202 4.339,22.202 4.339,22.671 6.184,22.671 6.184,22.202 6.184,18.205 6.875,18.205 6.875,22.202 6.875,22.671 8.716,22.671 8.716,22.202 8.312,22.202 8.312,18.205 9.085,18.205 9.085,13.046 11.625,15.654 12.663,15.398 13.238,15.542 16.115,12.249 16.279,13.554 13.607,18.146 16.689,18.146 16.689,22.144 16.284,22.144 16.284,22.609 18.127,22.609 18.127,22.144 18.129,22.144 18.129,18.146 18.818,18.146 18.818,22.144 18.818,22.609 20.662,22.609 20.662,22.144 20.257,22.144 20.257,18.146 22.646,18.146 20.292,13.554 20.421,11.948 22.67,14.962 24.16,14.591 20.594,9.769"/></svg>'
  },
  // Детский

  {
    id: 9648,
    title: 'filter_genre_de',
    icon: ''
  },
  // Детектив
  {
    id: 10765,
    title: 'filter_genre_hf',
    icon: '<svg fill="currentColor" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M52.71,42.72H36.9A5.89,5.89,0,0,0,32,45.34a5.89,5.89,0,0,0-4.9-2.62H11.29A4.29,4.29,0,0,0,7,47v7.57A2.42,2.42,0,0,0,9.42,57H54.58A2.42,2.42,0,0,0,57,54.58V47A4.29,4.29,0,0,0,52.71,42.72Zm-15.81,2H52.71A2.3,2.3,0,0,1,55,47v.6H39.48a1,1,0,0,0,0,2H55v1.48H33V48.62A3.91,3.91,0,0,1,36.9,44.72Zm-25.61,0H27.1a3.91,3.91,0,0,1,3.9,3.9v2.47H9V49.61H24.52a1,1,0,0,0,0-2H9V47A2.29,2.29,0,0,1,11.29,44.72ZM9,54.58V53.09H31V55H9.42A.42.42,0,0,1,9,54.58Zm46,0a.42.42,0,0,1-.42.42H33V53.09H55Z"/><path d="M20.38,25.17a1,1,0,0,0-1.21.61,10.44,10.44,0,0,0,1.48,9.67A13.17,13.17,0,0,0,32,41.2c5.91,0,12.42-3,13.24-8.83,1.25-8.78-3.19-10.83-3.38-10.91a1,1,0,0,0-1.28,1.38,3.72,3.72,0,0,1,.25,2.74,2.17,2.17,0,0,1-.68.84c-.07-2.52-2-5.38-5.5-8.26-2.71-2.21-.15-5.95,0-6.11a1,1,0,0,0,0-1.14,1,1,0,0,0-1.06-.4c-4.12,1-11.46,5.09-9.78,13.14.6,2.92.21,4.37-.36,4.76a1.32,1.32,0,0,1-1.35-.2,2,2,0,0,1-1-1.87A1,1,0,0,0,20.38,25.17ZM35.2,37.84c-.22.73-1,1.17-2.29,1.31-.4,0-.82,0-1.26,0-1,0-2.21-.22-2.67-.92-.78-1.18.38-3.92,1.23-5.92.31-.72.59-1.38.81-2C33.49,32.46,35.74,36,35.2,37.84ZM24.5,30.07c1-.71,2.1-2.46,1.19-6.83-1.19-5.77,3.24-8.72,6.09-10a5.6,5.6,0,0,0,1.58,6.46c3.69,3,5.39,6,4.54,8a1,1,0,0,0,1.18,1.36,5,5,0,0,0,3.55-2.69,3.37,3.37,0,0,0,.22-.68,12.9,12.9,0,0,1,.38,6.39c-.35,2.49-2.36,5-6.1,6.25.94-3.39-3-8.48-6.16-10.52a1,1,0,0,0-1.54.75,13.3,13.3,0,0,1-1.06,3c-.93,2.19-2,4.62-1.56,6.57a11.21,11.21,0,0,1-4.51-3.82,9.49,9.49,0,0,1-1.72-4.69l.34.25A3.19,3.19,0,0,0,24.5,30.07Z"/><path d="M9.06,13.13c-1.24.63-2.06,1-2.06,1.95S7.82,16.4,9.06,17a9.28,9.28,0,0,1,4.07,4.08c.63,1.23,1,2,1.95,2s1.32-.82,1.94-2A9.25,9.25,0,0,1,21.1,17c1.23-.62,2-1,2-1.94s-.82-1.32-2-1.95A9.23,9.23,0,0,1,17,9.06C16.4,7.82,16,7,15.08,7s-1.32.82-1.95,2.06A9.26,9.26,0,0,1,9.06,13.13ZM14.92,10c0-.09.1-.2.16-.31l.15.31a11.24,11.24,0,0,0,5,5l.31.16-.31.15a11.32,11.32,0,0,0-5,5c0,.09-.1.19-.15.31-.06-.12-.12-.22-.16-.31a11.35,11.35,0,0,0-5-5l-.32-.15.32-.16A11.27,11.27,0,0,0,14.92,10Z"/><path d="M55.33,18.11a6.6,6.6,0,0,1-2.91-2.91c-.47-.93-.84-1.67-1.67-1.67s-1.2.74-1.67,1.67a6.6,6.6,0,0,1-2.91,2.91h0c-.93.47-1.67.84-1.67,1.67s.74,1.21,1.67,1.68a6.58,6.58,0,0,1,2.91,2.9c.47.94.84,1.67,1.67,1.67s1.2-.73,1.67-1.67a6.58,6.58,0,0,1,2.91-2.9C56.26,21,57,20.62,57,19.78S56.26,18.58,55.33,18.11Zm-4.58,5.14a8.69,8.69,0,0,0-3.46-3.47,8.66,8.66,0,0,0,3.46-3.46,8.63,8.63,0,0,0,3.47,3.46A8.65,8.65,0,0,0,50.75,23.25Z"/></svg>'
  },
  // НФ и Фэнтези

  {
    id: 10768,
    title: 'filter_genre_mp',
    icon: '<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M20 6h3v2h-1v11h1v2H1v-2h1V8H1V6h3V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2zm0 2H4v11h3v-7h2v7h2v-7h2v7h2v-7h2v7h3V8zM6 5v1h12V5H6z"/></svg>'
  },
  // Война и Политика

  {
    id: 37,
    title: 'filter_genre_ve',
    icon: ''
  } // Вестерн
  ];
  var sortOptions = [{
    title: 'title_popular',
    sort: 'popularity.desc'
  }, {
    title: 'title_new',
    sort: 'release_date.desc'
  }, {
    title: 'title_hight_voite',
    sort: 'vote_average.desc'
  }, {
    title: 'title_in_top',
    sort: 'vote_count.desc'
  }];
  function applyWithoutKeywords(baseUrl) {
    if (!defaultConfig.withoutKeywords.enabled) return baseUrl;
    var filterLevel = defaultConfig.withoutKeywords.level;
    var baseExcludedKeywords = ['346488',
    // Гей-тематика
    '158718',
    // ЛГБТ-тематика
    '41278' // Российская политика
    ];
    if (!filterLevel || filterLevel == '1') {
      baseExcludedKeywords.push('13141',
      // Основано на манге
      '345822',
      // Основано на 4-кома манге
      '315535',
      // Донхуа (китайская анимация)
      '290667',
      // Основано на маньхуа
      '323477',
      // Основано на манхве
      '290609' // Манхва
      );
    }
    if (filterLevel == '2') {
      baseExcludedKeywords.push('210024', '13141', '345822', '315535', '290667', '323477', '290609');
    }
    baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));
    return baseUrl;
  }
  function addStyles() {
    Lampa.Template.add('genres_compact_wide_style', "\n            <style>\n                .card--genre-compact {\n                    width: 12.75em !important;\n                }\n                .card--genre-compact .card__view {\n                    padding-bottom: 56% !important;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    background-color: rgba(0, 0, 0, 0.2);\n                    border-radius: 1em;\n                }\n                .card--genre-compact.hover .card__view,\n                .card--genre-compact.focus .card__view {\n                    background-color: rgba(255, 255, 255, 0.1);\n                }\n                .card--genre-compact .card__title,\n                .card--genre-compact .card__age {\n                    display: none !important;\n                }\n                .card__svg-icon {\n                    position: absolute;\n                    top: 45%;\n                    left: 50%;\n                    transform: translate(-50%, -50%);\n                    width: 40% !important;\n                    height: 40% !important;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                }\n                .card__svg-icon svg {\n                    width: 100% !important;\n                    height: 100% !important;\n                    fill: currentColor;\n                }\n                .card__svg-icon svg path,\n                .card__svg-icon svg polygon {\n                    fill: rgba(255, 255, 255, 0.8) !important;\n                }\n                .card__genre-label {\n                    position: absolute;\n                    bottom: 0.4em;\n                    left: 0;\n                    right: 0;\n                    text-align: center;\n                    color: #fff;\n                    padding: 0.5em;\n                    font-size: 1.1em;\n                    font-weight: 500;\n                    z-index: 1;\n                }\n            </style>\n        ");
    $('body').append(Lampa.Template.get('genres_compact_wide_style', {}, true));
  }
  function openGenre(genre) {
    var hasMovie = movieGenres.some(function (g) {
      return g.id === genre.id;
    });
    var hasTv = tvGenres.some(function (g) {
      return g.id === genre.id;
    });
    var typeChoices = [];
    if (hasMovie) {
      typeChoices.push({
        title: Lampa.Lang.translate('menu_movies'),
        value: 'movie'
      });
    }
    if (hasTv) {
      typeChoices.push({
        title: Lampa.Lang.translate('menu_tv'),
        value: 'tv'
      });
    }
    if (typeChoices.length === 1) {
      showSortMenu(genre, typeChoices[0].value, false);
      return;
    }
    Lampa.Select.show({
      title: Lampa.Lang.translate(genre.title),
      items: typeChoices,
      onSelect: function (t) {
        showSortMenu(genre, t.value, true);
      },
      onBack: function () {
        Lampa.Controller.toggle('content');
      }
    });
  }
  function showSortMenu(genre, type, fromTypeSelection) {
    var sortItems = sortOptions.map(function (s) {
      return {
        title: Lampa.Lang.translate(s.title),
        sort: s.sort
      };
    });
    Lampa.Select.show({
      title: Lampa.Lang.translate('filter_sorted'),
      items: sortItems,
      onSelect: function (sortItem) {
        var base = type === 'movie' ? 'discover/movie' : 'discover/tv';
        var url = base + '?with_genres=' + genre.id + '&sort_by=' + sortItem.sort;
        if (sortItem.sort === 'release_date.desc') {
          var today = new Date();
          var tenDaysAgo = new Date(today);
          tenDaysAgo.setDate(today.getDate() - 10);
          var nineMonthsAgo = new Date(today);
          nineMonthsAgo.setMonth(today.getMonth() - 9);
          var dateField = type === 'movie' ? 'primary_release_date' : 'first_air_date';
          var lte = dateField + '.lte=' + formatDate(tenDaysAgo);
          var gte = dateField + '.gte=' + formatDate(nineMonthsAgo);
          url += '&' + lte + '&' + gte + '&vote_count.gte=20';
        }
        if (sortItem.sort === 'vote_average.desc') {
          url += '&vote_count.gte=400';
        }
        url = applyWithoutKeywords(url);
        Lampa.Activity.push({
          url: url,
          title: Lampa.Lang.translate(genre.title),
          component: 'category_full',
          source: 'tmdb',
          card_type: type,
          page: 1
        });
      },
      onBack: function () {
        if (fromTypeSelection) {
          openGenre(genre);
        } else {
          Lampa.Controller.toggle('content');
        }
      }
    });
  }
  function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  }
  function createGenresRow(genresData) {
    var allGenres = movieGenres.slice();
    tvGenres.forEach(function (tvGenre) {
      if (!allGenres.find(function (g) {
        return g.id === tvGenre.id;
      })) {
        allGenres.push(tvGenre);
      }
    });

    // Добавляем функцию в массив, а не регистрируем напрямую
    genresData.unshift(function (callback) {
      var results = allGenres.map(function (g) {
        return {
          source: 'custom',
          title: Lampa.Lang.translate(g.title),
          name: Lampa.Lang.translate(g.title),
          params: {
            createInstance: function () {
              var card = Lampa.Maker.make('Card', this, function (m) {
                return m.only('Card', 'Callback');
              });
              card.data.icon_svg = g.icon;
              return card;
            },
            emit: {
              onCreate: function () {
                this.html.addClass('card--genre-compact');
                var iconData = g.icon;
                if (iconData && iconData.startsWith('<svg')) {
                  var imgElement = this.html.find('.card__img');
                  var svgContainer = document.createElement('div');
                  svgContainer.classList.add('card__svg-icon');
                  svgContainer.innerHTML = iconData;
                  imgElement.replaceWith(svgContainer);
                }
                var genreLabel = document.createElement('div');
                genreLabel.classList.add('card__genre-label');
                genreLabel.innerText = Lampa.Lang.translate(g.title);
                this.html.find('.card__view').append(genreLabel);
              },
              onlyEnter: function () {
                openGenre(g);
              }
            }
          }
        };
      });
      callback({
        results: results,
        title: defaultConfig.rowTitle,
        params: {
          items: {
            view: 20,
            mapping: 'line'
          }
        }
      });
    });
  }
  function startPlugin() {
    addStyles();
    Lampa.ContentRows.add({
      index: defaultConfig.rowIndex,
      name: 'genres_buttons',
      title: defaultConfig.rowTitle,
      screen: ['main'],
      call: function (params, screen) {
        var genresData = [];
        createGenresRow(genresData);
        return function (callback) {
          if (genresData.length > 0) {
            genresData[0](callback);
          }
        };
      }
    });

    // Глобальный экспорт данных и функций
    window.genres_getMovieGenres = function () {
      return movieGenres.slice(); // Возвращаем копию массива
    };
    window.genres_getTvGenres = function () {
      return tvGenres.slice(); // Возвращаем копию массива
    };
    window.genres_getAllGenres = function () {
      var allGenres = movieGenres.slice();
      tvGenres.forEach(function (tvGenre) {
        if (!allGenres.find(function (g) {
          return g.id === tvGenre.id;
        })) {
          allGenres.push(tvGenre);
        }
      });
      return allGenres;
    };
    window.genres_openGenre = openGenre;
    window.genres_createGenresRow = createGenresRow;
  }
  if (Lampa.Manifest.app_digital >= 300) {
    if (window.appready) startPlugin();else Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') startPlugin();
    });
  }
})();

(function () {
  'use strict';

  if (window.SursSelect && window.SursSelect.__initialized) return;
  window.SursSelect = window.SursSelect || {};
  window.SursSelect.__initialized = true;

  // Локализация
  Lampa.Lang.add({
    sursSelect_vote_count_desc: {
      ru: "Много голосов",
      en: "Most Votes",
      uk: "Багато голосів"
    },
    sursSelect_vote_average_desc: {
      ru: "Высокий рейтинг",
      en: "High Rating",
      uk: "Високий рейтинг"
    },
    sursSelect_first_air_date_desc: {
      ru: "Новинки",
      en: "New Releases",
      uk: "Новинки"
    },
    sursSelect_popularity_desc: {
      ru: "Популярные",
      en: "Popular",
      uk: "Популярні"
    },
    sursSelect_revenue_desc: {
      ru: "Кассовые сборы",
      en: "Box Office",
      uk: "Касові збори"
    },
    sursSelect_menu_title: {
      ru: "Разделы",
      en: "Sections",
      uk: "Розділи"
    },
    sursSelect_movies: {
      ru: "Фильмы",
      en: "Movies",
      uk: "Фільми"
    },
    sursSelect_tvshows: {
      ru: "Сериалы",
      en: "TV Shows",
      uk: "Серіали"
    },
    sursSelect_dorama_tvshows: {
      ru: "Корейские дорамы",
      en: "Korean dramas",
      uk: "Корейські драми"
    },
    sursSelect_turkish_tvshows: {
      ru: "Турецкие сериалы",
      en: "Turkish series",
      uk: "Турецькі серіали"
    },
    sursSelect_streaming: {
      ru: "Стриминги",
      en: "Streaming",
      uk: "Стрімінг"
    },
    sursSelect_kids: {
      ru: "Для детей",
      en: "For Kids",
      uk: "Для дітей"
    },
    sursSelect_all_movies: {
      ru: "Все фильмы",
      en: "All Movies",
      uk: "Усі фільми"
    },
    sursSelect_russian_movies: {
      ru: "Российские фильмы",
      en: "Russian Movies",
      uk: "Російські фільми"
    },
    sursSelect_animated_movies: {
      ru: "Мультфильмы",
      en: "Animated Movies",
      uk: "Мультфільми"
    },
    sursSelect_all_tvshows: {
      ru: "Все сериалы",
      en: "All TV Shows",
      uk: "Усі серіали"
    },
    sursSelect_russian_tvshows: {
      ru: "Российские сериалы",
      en: "Russian TV Shows",
      uk: "Російські серіали"
    },
    sursSelect_animated_tvshows: {
      ru: "Мультсериалы",
      en: "Animated TV Shows",
      uk: "Мультсеріали"
    },
    sursSelect_kids_movies: {
      ru: "Мультфильмы",
      en: "Cartoons",
      uk: "Мультфільми"
    },
    sursSelect_kids_tvshows: {
      ru: "Мультсериалы",
      en: "Cartoon Series",
      uk: "Мультсеріали"
    },
    sursSelect_kids_family: {
      ru: "Семейные",
      en: "Family",
      uk: "Сімейні"
    },
    sursSelect_global_streaming: {
      ru: "Глобальные стриминги",
      en: "Global Streaming",
      uk: "Глобальний стрімінг"
    },
    sursSelect_russian_streaming: {
      ru: "Российские стриминги",
      en: "Russian Streaming",
      uk: "Російський стрімінг"
    },
    sursSelect_service_selection: {
      ru: "Выбор сервиса",
      en: "Service Selection",
      uk: "Вибір сервісу"
    },
    sursSelect_sorting: {
      ru: "Сортировка",
      en: "Sorting",
      uk: "Сортування"
    },
    sursSelect_menu_item: {
      ru: "Подборки",
      en: "Collections",
      uk: "Колекції"
    },
    sursSelect_lnum_collections: {
      en: 'LNUM - Collections',
      ru: 'LNUM - Коллекции',
      uk: 'LNUM - Колекції'
    },
    surs_select_plugins_section_title: {
      en: 'Third-party plugins',
      ru: 'Сторонние плагины',
      uk: 'Сторонні плагіни'
    }
  });

  // Сервисы стриминга
  var allStreamingServices = [{
    id: 2552,
    title: 'Apple TV+'
  }, {
    id: 1024,
    title: 'Amazon Prime'
  }, {
    id: 49,
    title: 'HBO'
  }, {
    id: 77,
    title: 'SyFy'
  }, {
    id: 453,
    title: 'Hulu'
  }, {
    id: 213,
    title: 'Netflix'
  }, {
    id: 3186,
    title: 'HBO Max'
  }, {
    id: 2076,
    title: 'Paramount network'
  }, {
    id: 4330,
    title: 'Paramount+'
  }, {
    id: 3353,
    title: 'Peacock'
  }, {
    id: 2739,
    title: 'Disney+'
  }, {
    id: 2,
    title: 'ABC'
  }, {
    id: 6,
    title: 'NBC'
  }, {
    id: 16,
    title: 'CBS'
  }, {
    id: 318,
    title: 'Starz'
  }, {
    id: 174,
    title: 'AMC'
  }, {
    id: 19,
    title: 'FOX'
  }, {
    id: 64,
    title: 'Discovery'
  }, {
    id: 493,
    title: 'BBC America'
  }, {
    id: 88,
    title: 'FX'
  }, {
    id: 67,
    title: 'Showtime'
  }];
  var allStreamingServicesRUS = [{
    id: 2493,
    title: 'Start'
  }, {
    id: 2859,
    title: 'Premier'
  }, {
    id: 4085,
    title: 'KION'
  }, {
    id: 3871,
    title: 'Okko'
  }, {
    id: 3827,
    title: 'Кинопоиск'
  }, {
    id: 5806,
    title: 'Wink'
  }, {
    id: 3923,
    title: 'ИВИ'
  }, {
    id: 806,
    title: 'СТС'
  }, {
    id: 1191,
    title: 'ТНТ'
  }, {
    id: 3031,
    title: 'Пятница'
  }, {
    id: 3882,
    title: 'More.TV'
  }, {
    id: 412,
    title: 'Россия 1'
  }, {
    id: 558,
    title: 'Первый канал'
  }];

  // Варианты сортировки
  var sortOptionsTV = [{
    id: 'first_air_date.desc',
    title: 'sursSelect_first_air_date_desc',
    extraParams: ''
  }, {
    id: 'vote_average.desc',
    title: 'sursSelect_vote_average_desc',
    extraParams: ''
  }, {
    id: 'popularity.desc',
    title: 'sursSelect_popularity_desc',
    extraParams: ''
  }, {
    id: 'vote_count.desc',
    title: 'sursSelect_vote_count_desc',
    extraParams: ''
  }];
  var sortOptionsMovie = [{
    id: 'release_date.desc',
    title: 'sursSelect_first_air_date_desc',
    extraParams: ''
  }, {
    id: 'vote_average.desc',
    title: 'sursSelect_vote_average_desc',
    extraParams: ''
  }, {
    id: 'popularity.desc',
    title: 'sursSelect_popularity_desc',
    extraParams: ''
  }, {
    id: 'revenue.desc',
    title: 'sursSelect_revenue_desc',
    extraParams: ''
  }];
  var baseExcludedKeywords = ['346488', '158718', '41278', '196034', '272265', '13141', '345822', '315535', '290667', '323477', '290609'];

  // Применение параметров сортировки с индивидуальными настройками
  function applySortParams(sort, options) {
    var params = '';
    var now = new Date();
    var isNewRelease = sort.id === 'first_air_date.desc' || sort.id === 'release_date.desc';
    var isHighRating = sort.id === 'vote_average.desc';
    var isVoteCount = sort.id === 'vote_count.desc';

    // Базовые параметры для дат выпуска
    if (sort.id === 'first_air_date.desc') {
      var end = new Date(now);
      end.setDate(now.getDate() - 10);
      var start = new Date(now);
      start.setFullYear(start.getFullYear() - 3);
      params += '&first_air_date.gte=' + start.toISOString().split('T')[0];
      params += '&first_air_date.lte=' + end.toISOString().split('T')[0];
    }
    if (sort.id === 'release_date.desc') {
      var end = new Date(now);
      end.setDate(now.getDate() - 40);
      var start = new Date(now);
      start.setFullYear(start.getFullYear() - 3);
      params += '&release_date.gte=' + start.toISOString().split('T')[0];
      params += '&release_date.lte=' + end.toISOString().split('T')[0];
    }

    // Индивидуальные настройки для каждого типа контента
    if (options.isKids) {
      // Детский контент
      if (options.isMovie) {
        // Детские фильмы (мультфильмы)
        if (isHighRating) params += '&vote_count.gte=40';else if (isNewRelease) params += '&vote_count.gte=2';else params += '&vote_count.gte=2';
      } else {
        // Детские сериалы (мультсериалы)
        if (isHighRating) params += '&vote_count.gte=40';else if (isNewRelease) params += '&vote_count.gte=2';else params += '&vote_count.gte=2';
      }
    } else if (options.isRussian) {
      // Российский контент
      if (options.isMovie) {
        // Российские фильмы
        if (isHighRating) params += '&vote_count.gte=40';else if (isNewRelease) params += '&vote_count.gte=5';else params += '&vote_count.gte=10';
      } else {
        // Российские сериалы
        if (isHighRating) params += '&vote_count.gte=10';else if (isNewRelease) params += '&vote_count.gte=';else params += '&vote_count.gte=10';
      }
    } else if (options.isStreaming) {
      // Стриминговые сервисы
      if (options.isGlobalStreaming) {
        // Глобальные стриминги (Netflix, HBO и т.д.)
        if (isHighRating) params += '&vote_count.gte=100';else if (isNewRelease) params += '&vote_count.gte=20';else params += '&vote_count.gte=10';
      } else {
        // Российские стриминги
        if (isHighRating) params += '&vote_count.gte=10';else if (isNewRelease) params += '&vote_count.gte=';else params += '&vote_count.gte=5';
      }
    } else if (options.isDorama) {
      // Корейские дорамы
      if (isHighRating) params += '&vote_count.gte=100';else if (isNewRelease) params += '&vote_count.gte=15';else params += '&vote_count.gte=10';
    } else if (options.isTurkish) {
      // Турецкие сериалы
      if (isHighRating) params += '&vote_count.gte=60';else if (isNewRelease) params += '&vote_count.gte=10';else params += '&vote_count.gte=10';
    } else {
      // Общие категории
      if (options.isMovie) {
        // Все фильмы
        if (isHighRating) params += '&vote_count.gte=700';else if (isNewRelease) params += '&vote_count.gte=20';else params += '&vote_count.gte=20';
      } else {
        // Все сериалы
        if (isHighRating) params += '&vote_count.gte=150';else if (isNewRelease) params += '&vote_count.gte=25';else params += '&vote_count.gte=25';
      }
    }

    // Дополнительные параметры для сортировки по количеству голосов
    if (isVoteCount) {
      params += '&vote_average.gte=5';
    }

    // Исключение нежелательного контента
    params += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));
    sort.extraParams = params;
    return sort;
  }

  // Работа с логотипами
  function getLogoUrl(networkId, name, callback) {
    var apiUrl = Lampa.TMDB.api('network/' + networkId + '?api_key=' + Lampa.TMDB.key());
    $.ajax({
      url: apiUrl,
      type: 'GET',
      success: function (data) {
        var imgUrl = data && data.logo_path ? Lampa.TMDB.image('t/p/w154' + data.logo_path) : '';
        callback(imgUrl);
      },
      error: function () {
        callback('');
      }
    });
  }
  function createLogoHtml(networkId, name) {
    return '<div style="display: flex; align-items: center; padding: 0.5em 0">' + '<div style="width: 2.75em; height: 1em; margin-right: 1em;">' + (networkId ? '<img src="" style="width: 100%; height: 100%; object-fit: contain; filter: grayscale(100%);" class="logo-' + networkId + '">' : '') + '</div>' + '<div style="font-size: 1.3em; display: flex; align-items: center;">' + name + '</div>' + '</div>';
  }
  function updateLogo(networkId, name) {
    if (networkId) {
      getLogoUrl(networkId, name, function (url) {
        if (url) {
          $('.logo-' + networkId).attr('src', url);
        }
      });
    }
  }

  // Основное меню
  function showSursSelectMenu() {
    var items = [{
      title: Lampa.Lang.translate('sursSelect_movies'),
      action: 'movies'
    }, {
      title: Lampa.Lang.translate('sursSelect_tvshows'),
      action: 'tvshows'
    }, {
      title: Lampa.Lang.translate('sursSelect_streaming'),
      action: 'streaming'
    }, {
      title: Lampa.Lang.translate('sursSelect_kids'),
      action: 'kids'
    }];
    if (window.lnum_plugin === true) {
      items.push({
        title: Lampa.Lang.translate('surs_select_plugins_section_title'),
        separator: true
      });
      items.push({
        title: Lampa.Lang.translate('sursSelect_lnum_collections'),
        action: 'lnum_collections'
      });
    }
    Lampa.Select.show({
      title: Lampa.Lang.translate('sursSelect_menu_title'),
      items: items,
      onSelect: function (item) {
        if (item.action === 'movies') showMovieMenu();else if (item.action === 'tvshows') showTVMenu();else if (item.action === 'streaming') showStreamingTypeMenu();else if (item.action === 'kids') showKidsMenu();else if (item.action === 'lnum_collections') {
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('sursSelect_lnum_collections'),
            component: 'category',
            source: 'LNUM'
          });
        }
      },
      onBack: function () {
        Lampa.Controller.toggle('content');
      }
    });
  }

  // Меню фильмов
  function showMovieMenu() {
    Lampa.Select.show({
      title: Lampa.Lang.translate('sursSelect_movies'),
      items: [{
        title: Lampa.Lang.translate('sursSelect_all_movies'),
        url: 'discover/movie?',
        isMovie: true
      }, {
        title: Lampa.Lang.translate('sursSelect_russian_movies'),
        url: 'discover/movie?&with_origin_country=RU',
        isRussian: true,
        isMovie: true
      }],
      onSelect: showSortList,
      onBack: showSursSelectMenu
    });
  }

  // Меню сериалов
  function showTVMenu() {
    Lampa.Select.show({
      title: Lampa.Lang.translate('sursSelect_tvshows'),
      items: [{
        title: Lampa.Lang.translate('sursSelect_all_tvshows'),
        url: 'discover/tv?&without_genres=16',
        isMovie: false
      }, {
        title: Lampa.Lang.translate('sursSelect_russian_tvshows'),
        url: 'discover/tv?&with_origin_country=RU',
        isRussian: true,
        isMovie: false
      },
      // Для дорам
      {
        title: Lampa.Lang.translate('sursSelect_dorama_tvshows'),
        url: 'discover/tv?&without_genres=16&with_origin_country=KR',
        isDorama: true,
        isMovie: false
      },
      // Для турецких сериалов
      {
        title: Lampa.Lang.translate('sursSelect_turkish_tvshows'),
        url: 'discover/tv?&without_genres=16&with_origin_country=TR',
        isTurkish: true,
        isMovie: false
      }],
      onSelect: showSortList,
      onBack: showSursSelectMenu
    });
  }

  // Меню для детей
  function showKidsMenu() {
    Lampa.Select.show({
      title: Lampa.Lang.translate('sursSelect_kids'),
      items: [{
        title: Lampa.Lang.translate('sursSelect_kids_movies'),
        url: 'discover/movie?&with_genres=16&certification_country=RU&certification=6%2B',
        isKids: true,
        isMovie: true
      }, {
        title: Lampa.Lang.translate('sursSelect_kids_tvshows'),
        url: 'discover/tv?&with_genres=16&certification_country=RU&certification=6%2B',
        isKids: true,
        isMovie: false
      }, {
        title: Lampa.Lang.translate('sursSelect_kids_family'),
        url: 'discover/movie?&certification_country=RU&certification=6%2B',
        isKids: true,
        isMovie: true
      }],
      onSelect: function (item) {
        showSortList({
          url: item.url,
          title: item.title,
          isKids: item.isKids,
          isMovie: item.isMovie
        });
      },
      onBack: showSursSelectMenu
    });
  }

  // Меню стримингов
  function showStreamingTypeMenu() {
    Lampa.Select.show({
      title: Lampa.Lang.translate('sursSelect_streaming'),
      items: [{
        title: Lampa.Lang.translate('sursSelect_global_streaming'),
        list: allStreamingServices,
        isGlobalStreaming: true
      }, {
        title: Lampa.Lang.translate('sursSelect_russian_streaming'),
        list: allStreamingServicesRUS,
        isGlobalStreaming: false
      }],
      onSelect: function (item) {
        showServiceList(item.list, item.isGlobalStreaming);
      },
      onBack: showSursSelectMenu
    });
  }

  // Выбор сервиса
  function showServiceList(serviceList, isGlobalStreaming) {
    var items = [];
    for (var i = 0; i < serviceList.length; i++) {
      items.push({
        title: '<div class="settings-folder" style="padding:0!important">' + createLogoHtml(serviceList[i].id, serviceList[i].title) + '</div>',
        service: serviceList[i],
        isGlobalStreaming: isGlobalStreaming
      });
      updateLogo(serviceList[i].id, serviceList[i].title);
    }
    Lampa.Select.show({
      title: Lampa.Lang.translate('sursSelect_service_selection'),
      items: items,
      onSelect: function (item) {
        showSortList({
          url: 'discover/tv?with_networks=' + item.service.id,
          title: item.service.title,
          isStreaming: true,
          isGlobalStreaming: item.isGlobalStreaming,
          isMovie: false
        });
      },
      onBack: showStreamingTypeMenu
    });
  }

  // Выбор сортировки
  function showSortList(service) {
    var isMovie = service.isMovie !== undefined ? service.isMovie : service.url.startsWith('discover/movie');
    var currentSortOptions = isMovie ? sortOptionsMovie : sortOptionsTV;
    var sortItems = [];
    for (var i = 0; i < currentSortOptions.length; i++) {
      sortItems.push({
        title: Lampa.Lang.translate(currentSortOptions[i].title),
        sort: applySortParams(currentSortOptions[i], {
          isRussian: service.isRussian || service.url.includes('with_original_language=ru'),
          isStreaming: service.isStreaming || service.url.includes('with_networks='),
          isGlobalStreaming: service.isGlobalStreaming,
          isKids: service.isKids || false,
          isDorama: service.isDorama || false,
          isTurkish: service.isTurkish || false,
          isMovie: isMovie
        })
      });
    }
    Lampa.Select.show({
      title: Lampa.Lang.translate('sursSelect_sorting'),
      items: sortItems,
      onSelect: function (sortItem) {
        var sort = sortItem.sort;
        Lampa.Activity.push({
          url: service.url + sort.extraParams,
          title: service.title + ' - ' + Lampa.Lang.translate(sortItem.title),
          component: 'category_full',
          card_type: 'true',
          sort_by: sort.id,
          page: 1
        });
      },
      onBack: function () {
        if (service.isStreaming) {
          showStreamingTypeMenu();
        } else if (service.isKids) {
          showKidsMenu();
        } else {
          isMovie ? showMovieMenu() : showTVMenu();
        }
      }
    });
  }

  // Инициализация плагина
  function initPlugin() {
    // Иконка для основного меню
    var collectionsIcon = '<svg fill="currentColor" height="200px" width="200px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' + '<path d="M26,16H6c-1.7,0-3-1.3-3-3s1.3-3,3-3h20c1.7,0,3,1.3,3,3S27.7,16,26,16z"/>' + '<path d="M26.7,14.3C26.6,14.1,26.3,14,26,14H6c-0.3,0-0.6,0.1-0.7,0.3C5.1,14.6,5,14.8,5,15.1l2,16C7.1,31.6,7.5,32,8,32h5c-0.5,0-1-0.4-1-0.9l-1-14c0-0.6,0.4-1,0.9-1.1c0.6,0,1,0.4,1.1,0.9l1,14c0,0.6-0.4,1-0.9,1.1c0,0,0,0-0.1,0h6c0,0,0,0-0.1,0c-0.6,0-1-0.5-0.9-1.1l1-14c0-0.6,0.5-1,1.1-0.9c0.6,0,1,0.5,0.9,1.1l-1,14c0,0.5-0.5,0.9-1,0.9h5c0.5,0,0.9-0.4,1-0.9l2-16C27,14.8,26.9,14.6,26.7,14.3z"/>' + '<path d="M25.8,12L6.2,12c-0.4,0-0.8-0.3-0.9-0.7C5.1,10.9,5,10.5,5,10c0-1.5,0.8-2.8,2-3.5C7,6.4,7,6.2,7,6c0-2.2,1.8-4,4-4c0.5,0,1,0.1,1.4,0.3C13.1,0.9,14.4,0,16,0s2.9,0.9,3.6,2.3C20,2.1,20.5,2,21,2c2.2,0,4,1.8,4,4c0,0.2,0,0.4,0,0.5c1.2,0.7,2,2,2,3.5c0,0.5-0.1,0.9-0.2,1.3C26.6,11.7,26.3,12,25.8,12z M7,10l18,0c0,0,0,0,0,0c0-0.9-0.6-1.7-1.5-1.9C23.2,8,23,7.8,22.9,7.6c-0.1-0.3-0.1-0.6,0-0.8C23,6.5,23,6.2,23,6c0-1.1-0.9-2-2-2c-0.5,0-1,0.2-1.3,0.5c-0.3,0.3-0.7,0.3-1,0.2C18.3,4.6,18,4.2,18,3.9C17.9,2.8,17,2,16,2s-1.9,0.8-2,1.9c0,0.4-0.3,0.7-0.6,0.9c-0.4,0.1-0.8,0.1-1-0.2C12,4.2,11.5,4,11,4C9.9,4,9,4.9,9,6c0,0.2,0,0.5,0.1,0.7c0.1,0.3,0.1,0.6,0,0.8C9,7.8,8.8,8,8.5,8.1C7.6,8.3,7,9.1,7,10L7,10z"/>' + '</svg>';

    // Иконка для детского раздела
    var kidsIcon = '<svg viewBox="0 0 514 514" xmlns="http://www.w3.org/2000/svg">' + '<path d="m400 2c-79 6-142 75-142 156v14h-99l-98 1-5 2c-38 17-23 63 21 65h15l-3 6c-10 20-10 24-11 76v45l-5-8c-7-12-13-26-18-39-5-15-6-17-11-21-13-12-35-7-41 10-6 16 17 70 46 105 116 145 347 127 439-34 31-54 31-87-1-87-15 0-21 5-28 27-6 18-28 58-31 58-1 0-1-22-1-49v-50l-11-55c-12-60-12-58-6-63 8-7 15-3 24 11 14 24 29 30 47 21 20-9 21-17 10-71-10-52-10-53 2-53s21-14 20-28c-1-6-2-7-10-13-30-20-65-29-103-26m43 74c-10 3-14 17-6 25 13 13 32-4 23-19-3-5-11-8-17-6m-289 114v27l1 26 2 3 3 3h46 46l3-3 2-3v-27-27h-51c-36 0-51 0-52 1m78 116c-54 9-96 54-102 109l-1 6 10 6c70 45 158 47 230 4 9-5 8-4 7-15-7-71-73-122-144-110" fill="currentColor" fill-rule="evenodd"/>' + '</svg>';

    // Кнопка "Подборки" в меню
    var menuItem = $('<li class="menu__item selector" data-action="streaming">' + '<div class="menu__ico">' + collectionsIcon + '</div>' + '<div class="menu__text">' + Lampa.Lang.translate('sursSelect_menu_item') + '</div>' + '</li>');
    menuItem.on('hover:enter', showSursSelectMenu);
    $('.menu .menu__list').eq(0).append(menuItem);

    // Кнопка "Для детей" в меню
    var kidsMenuItem = $('<li class="menu__item selector" data-action="kids">' + '<div class="menu__ico">' + kidsIcon + '</div>' + '<div class="menu__text">' + Lampa.Lang.translate('sursSelect_kids') + '</div>' + '</li>');
    kidsMenuItem.on('hover:enter', showKidsMenu);
    $('.menu .menu__list').eq(0).append(kidsMenuItem);
  }

  // Запуск плагина
  if (window.appready) {
    initPlugin();
  } else {
    Lampa.Listener.follow('app', function (e) {
      if (e.type === 'ready') initPlugin();
    });
  }
  window.SursSelect.showSursSelectMenu = showSursSelectMenu;
})();

(function () {
    'use strict';
    if (!window.Lampa || Lampa.Manifest.app_digital < 300) return;

    function refreshMainOnce() {
        if (window.surs_legacy_v3_main_refresh_scheduled) return;
        window.surs_legacy_v3_main_refresh_scheduled = true;

        setTimeout(function () {
            var active = Lampa.Activity.active ? Lampa.Activity.active() : null;
            if (!active || active.component !== 'main') return;

            Lampa.Activity.push({
                source: active.source || Lampa.Storage.get('source'),
                title: active.title || Lampa.Lang.translate('title_main'),
                component: 'main',
                page: 1
            });
        }, 900);
    }

    if (window.appready) {
        refreshMainOnce();
    } else {
        Lampa.Listener.follow('app', function (event) {
            if (event.type === 'ready') refreshMainOnce();
        });
    }
})();
