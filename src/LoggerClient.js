(function(exports, $) {
	'use strict';

	var LoggerClient = function(config) {
		this._config = config;
		this._ws = null;
		this._messageCount = 0;
		this._filter = {
			type: ['info', 'warn', 'error'],
			component: [],
			data: [],
		};

		this._$header = null;
		this._$rows = null;
		this._$componentFilter = null;
		this._$dataFilter = null;
	};

	LoggerClient.prototype.bootstrap = function() {
		this._loadOptions();
		this._setupReferences();
		this._setupEventListeners();
		this._setupUI();
		this._setupTypeFilters();
		this._setupWebSocket(this._config.websocket.host, this._config.websocket.port);
	};

	LoggerClient.prototype._setupReferences = function() {
		this._$header = $('#log-header');
		this._$rows = $('#log-rows');
		this._$componentFilter = $('#component-filter');
		this._$dataFilter = $('#data-filter');
	};

	LoggerClient.prototype._setupEventListeners = function() {
		var self = this;

		this._$componentFilter.on('keyup', function() {
			this._applyFilters();
		}.bind(this));

		this._$dataFilter.on('keyup', function() {
			this._applyFilters();
		}.bind(this));

		this._$rows.on('click', '.component-btn', function(e) {
			var component = $(this).data('component');

			self._$componentFilter.val(component);

			self._applyFilters();

			e.preventDefault();
		});

		$(window).resize(function() {
			this._setTableHeight();
			this._setColumnWidths();
		}.bind(this));

		//this._setTableHeight();
		this._setColumnWidths();
	};

	LoggerClient.prototype._setupUI = function() {
		this._setTableHeight();
		this._setActiveFilters();
	};

	LoggerClient.prototype._setupTypeFilters = function() {
		var self = this;

		$('.type-filter').click(function() {
			var isSelected = $(this).hasClass('is-selected');

			if (isSelected) {
				$(this).removeClass('is-selected');
			} else {
				$(this).addClass('is-selected');
			}

			self._filter.type = [];

			$('.type-filter.is-selected').each(function() {
				self._filter.type.push($(this).data('type'));
			});

			self._applyFilters();
		});
	};

	LoggerClient.prototype._setupWebSocket = function(host, port) {
		this._ws = new WebSocket('ws://' + host + ':' + port);

		this._ws.onopen = this._onSocketOpen.bind(this);
		this._ws.onmessage = this._onSocketMessage.bind(this);
	};

	LoggerClient.prototype._onSocketOpen = function() {
		this._request('become-client');
	};

	LoggerClient.prototype._onSocketMessage = function(event) {
		var payload;

		if (event.data.substr(0, 1) !== '{') {
			return;
		}

		payload = JSON.parse(event.data);

		if (typeof(payload) !== 'object' || payload === null || typeof(payload.handler) !== 'string') {
			return;
		}

		switch (payload.handler) {
			case 'log':
				this._handleLog(payload.info);
			break;

			case 'refresh':
				this._handleRefresh();
			break;
		}
	};

	LoggerClient.prototype._handleLog = function(info) {
		var date = new Date(info.date);

		this._renderLogItem({
			date: date,
			type: info.type,
			component: info.component,
			data: this._formatParameters(info.parameters)
		});
	};

	LoggerClient.prototype._handleRefresh = function() {
		this._clear();
	};

	LoggerClient.prototype._clear = function() {
		this._$rows.empty();
	};

	LoggerClient.prototype._renderLogItem = function(info) {
		var matchers = {
				type: info.type,
				component: info.component,
				data: info.data,
			},
			isHidden = this._getMatchesFilter(matchers, this._filter),
			wasAtBottom = this._isAtBottom();

		this._$rows.append(
			'<tr class="type-' + info.type + '"' + (isHidden ? ' style="display: none;"' : '') + '>' +
			'	<td class="col-type"><span class="is-hidden">' + info.type + '</span>' +
				this._formatTime(info.date) + '</td>' +
			'	<td class="col-component"><a href="#' + info.component + '" class="component-btn" data-component="' +
				info.component + '">' +
				info.component + '</a></td>' +
			'	<td class="col-data">' + info.data + '</td>' +
			'</tr>'
		);

		this._setColumnWidths();

		if (wasAtBottom) {
			this._scrollToBottom();
		}

		if (info.type === 'error') {
			this._playAlert();
		}
	};

	LoggerClient.prototype._setTableHeight = function() {
		var windowHeight = $(window).height(),
			headerHeight = this._$header.height();

		this._$rows.height(windowHeight - headerHeight - 2);
	};

	LoggerClient.prototype._setActiveFilters = function() {
		var i;

		$('.type-filter').removeClass('is-selected');

		for (i = 0; i < this._filter.type.length; i++) {
			$('.type-filter[data-type="' + this._filter.type[i] + '"]').addClass('is-selected');
		}

		this._$componentFilter.val(this._filter.component.join(','));
		this._$dataFilter.val(this._filter.data.join(','));
	};

	LoggerClient.prototype._setColumnWidths = function() {
		var self = this,
			windowWidth = $(window).width(),
			typeColumnWidth = this._$header.find('TR:eq(0) TH:eq(0)').outerWidth(),
			componentColumnWidth = this._$header.find('TR:eq(0) TH:eq(1)').outerWidth(),
			columnCount = this._$header.find('TR:eq(0) TH').length,
			columnWidth;

		this._$header.find('TR:eq(0) TH:eq(2)').width(windowWidth - typeColumnWidth - componentColumnWidth - 25);

		this._$header.find('TR:eq(0) TH').each(function(i) {
			columnWidth = $(this).width();

			if (i >= columnCount - 1) {
				columnWidth = columnWidth - 18;
			}

			self._$rows.find('TR:visible TD:eq(' + i + ')').width(columnWidth);
		});
	};

	LoggerClient.prototype._paintRows = function() {
		//this._$rows.find('TR:visible:odd').removeClass('even').addClass('odd');
		//this._$rows.find('TR:visible:even').removeClass('odd').addClass('even');
	};

	LoggerClient.prototype._scrollToBottom = function() {
		this._$rows.scrollTop(this._$rows[0].scrollHeight);
	};

	LoggerClient.prototype._isAtBottom = function() {
		return this._$rows.scrollTop() + this._$rows.innerHeight() >= this._$rows[0].scrollHeight;
	};

	LoggerClient.prototype._applyFilters = function() {
		var self = this,
			componentFilterValue = this._$componentFilter.val(),
			dataFilterValue = this._$dataFilter.val();

		this._filter.component = componentFilterValue.length > 0 ? this._$componentFilter.val().split(',') : [];
		this._filter.data = dataFilterValue.length > 0 ? this._$dataFilter.val().toLowerCase().split(',') : [];

		this._$rows.find('TR').each(function() {
			var type = $(this).find('TD:eq(0)').html().toLowerCase(),
				component = $(this).find('TD:eq(1)').html().toLowerCase(),
				data = $(this).find('TD:eq(2)').html().toLowerCase(),
				matchers = {
					type: type,
					component: component,
					data: data,
				},
				matchesFilter = self._getMatchesFilter(matchers, self._filter);

			if (matchesFilter) {
				$(this).hide();
			} else {
				$(this).show();
			}
		});

		this._setColumnWidths();
		this._paintRows();
		this._saveOptions();
	};

	LoggerClient.prototype._saveOptions = function() {
		window.localStorage.options = JSON.stringify({
			filter: this._filter
		});
	};

	LoggerClient.prototype._loadOptions = function() {
		var options;

		if (typeof(window.localStorage.options) !== 'string') {
			return;
		}

		options = JSON.parse(window.localStorage.options);

		this._filter = options.filter;
	};

	LoggerClient.prototype._getMatchesFilter = function(matchers, filter) {
		var filterName,
			matchedAny,
			keyword,
			negate,
			i;

		for (filterName in matchers) {
			if (filter[filterName].length === 0) {
				continue;
			}

			matchedAny = false;

			for (i = 0; i < filter[filterName].length; i++) {
				keyword = filter[filterName][i].toLowerCase();
				negate = false;

				if (keyword.substr(0, 1) === '-') {
					keyword = keyword.substr(1);
					negate = true;
				}

				if (keyword.length === 0) {
					matchedAny = true;

					continue;
				}

				if (matchers[filterName].toLowerCase().indexOf(keyword) !== -1) {
					if (!negate) {
						matchedAny = true;
					} else {
						return true;
					}
				}
			}

			if (!matchedAny) {
				return true;
			}
		}

		return false;
	};

	LoggerClient.prototype._formatParameters = function(value, level, undefined) {
		level = level || 0;

		var result = '',
			name,
			key,
			i;

		if (typeof(value) === 'string') {
			if (value.substr(0, 8) === '<{[DATE:') {
				value = new Date(value.substr(8, value.length - 11));
			} else if (value === '<{[UNDEFINED]}>') {
				value = undefined;
			}
		}

		if (value === null) {
			return '<span class="value-null" title="null">null</span>';
		} else if (typeof(value) === 'string' && value.substr(0, 12) === '<{[FUNCTION:') {
			name = value.substr(12, value.length - 15);

			return '<span class="value-function" title="function">[function' +
				(name.length > 0 ? ':' + name : '') + ']</span>';
		} else if (value instanceof Date) {
			return '<span class="value-date" title="Date">' + this._formatDatetime(value) + '</span>';
		} else if (typeof(value) === 'boolean') {
			return '<span class="value-boolean ' + (value ? 'true' : 'false') +
				'" title="boolean">' + value + '</span>';
		} else if (typeof(value) === 'undefined') {
			return '<span class="value-undefined" title="undefined">undefined</span>';
		} else if (typeof(value) === 'number') {
			return '<span class="value-number" title="number">' + value + '</span>';
		} else if (typeof(value) === 'string') {
			return '<span class="value-string" title="string">' +
				(level > 1 ? '\'' : '') + value.replace('<', '&lt;').replace('>', '&gt;') + (level > 1 ? '\'' : '') + '</span>';
		} else if (typeof(value) === 'function') {
			return '<span class="value-function" title="function">[function]</span>';
		} else if (Object.prototype.toString.call(value) === '[object Array]') {
			result = '';

			if (level > 0) {
				result += '<span class="value-array" title="array">[';
			}

			for (i = 0; i < value.length; i++) {
				if (i > 0) {
					result += ', ';
				}

				result += this._formatParameters(value[i], level + 1);
			}

			if (level > 0) {
				result += ']</span>';
			}
		} else if (Object.prototype.toString.call(value) === '[object Object]') {
			//return '<span class="value-object" title="object">' + JSON.stringify(value) + '</span>';

			result = '<span class="value-object" title="object">{';
			i = 0;

			for (key in value) {
				if (i > 0) {
					result += ', ';
				}

				result += this._formatParameters(key, level + 1) + ': ' + this._formatParameters(value[key], level + 1);

				i++;
			}

			result += '}</span>';
		} else {
			return '<span class="value-other" title="unknown type">[other]</span>';
		}

		return result;
	};

	LoggerClient.prototype._isConnectionValid = function() {
		return this._ws !== null && this._ws.readyState === 1;
	};

	LoggerClient.prototype._request = function(handler, parameters) {
		if (!this._isConnectionValid()) {
			return;
		}

		var payload = JSON.stringify({
			id: this._messageCount++,
			handler: handler,
			parameters: parameters || {},
			expectResponse: false
		});

		this._ws.send(payload);
	};

	LoggerClient.prototype._formatDate = function(date, includeYear) {
		if (typeof(includeYear) == 'undefined') {
			includeYear = true;
		}

		var year = date.getFullYear(),
			month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1),
			day = (date.getDate() < 10 ? '0' : '') + date.getDate();


		return day + '.' + month + (includeYear ? '.' + year : '');
	};

	LoggerClient.prototype._formatTime = function(date, includeSeconds) {
		includeSeconds = typeof(includeSeconds) != 'undefined' ? includeSeconds : true;

		return (date.getHours() < 10 ? '0' : '') + date.getHours() +
			':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() +
			(includeSeconds ? ':' + (date.getSeconds() < 10 ? '0' : '') +
			date.getSeconds() : '');
	};

	LoggerClient.prototype._formatDatetime = function(date) {
		return this._formatDate(date, true) + ' ' + this._formatTime(date);
	};

	LoggerClient.prototype._playAlert = function() {
		this._playSound('sounds/alert.ogg');
	};

	LoggerClient.prototype._playSound = function(filename) {
		var audio = new Audio(filename);

		audio.play();
	};

	exports.LoggerClient = LoggerClient;

})(window, jQuery);