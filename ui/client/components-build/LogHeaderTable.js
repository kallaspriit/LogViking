/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/State',
	'components/HistoryInput'
], function(React, logger, state, HistoryInput) {
	'use strict';
	
	var log = logger.get('LogHeaderTableComponent');

	var LogHeaderTable = React.createClass({displayName: 'LogHeaderTable',

		getFilterSource: function(filterType) {
			var settings = {
				time: {
					label: {
						placeholder: 'Time filter',
						clear: 'clear history'
					},
					dropdownAlign: 'left'
				},
				component: {
					label: {
						placeholder: 'Filter by component',
						clear: 'clear history'
					},
					dropdownAlign: 'right'
				},
				message: {
					label: {
						placeholder: 'Filter by message',
						clear: 'clear history'
					},
					dropdownAlign: 'right'
				}
			};

			return {
				getLabels: function() {
					return {
						placeholder: settings[filterType].label.placeholder,
						clear: settings[filterType].label.clear
					};
				}.bind(this),

				getValue: function() {
					return state.contentFilter[filterType].value;
				}.bind(this),

				onValueChange: function(newValue) {
					state.contentFilter[filterType].value = newValue;
				}.bind(this),

				onValueBlur: function(value) {
					var alreadyExists = state.contentFilter[filterType].history.indexOf(value) !== -1;

					if (!alreadyExists && value.length > 0) {
						state.contentFilter[filterType].history.push(value);
					}

					if (state.contentFilter[filterType].history.length > 5) {
						state.contentFilter[filterType].history.shift();
					}
				}.bind(this),

				getOptions: function() {
					return state.contentFilter[filterType].history;
				}.bind(this),

				selectOption: function(index) {
					log.info('select ' + filterType + ': "' + state.contentFilter[filterType].history[index] + '"');

					state.contentFilter[filterType].value = state.contentFilter[filterType].history[index];
				}.bind(this),

				removeOption: function(index) {
					log.info('remove ' + filterType + ': "' + state.contentFilter[filterType].history[index] + '"');

					state.contentFilter[filterType].history.splice(index, 1);
				}.bind(this),

				clearOptions: function() {
					log.info('clear options for ' + filterType);

					state.contentFilter[filterType].history = [];
				}.bind(this),

				getSettings: function() {
					return {
						dropdownAlign: settings[filterType].dropdownAlign
					}
				}.bind(this)
			}
		},

		render: function () {
			log.info('render');

			var filterType,
				filterSources = {};

			for (filterType in state.contentFilter) {
				if (filterType.substr(0, 1) === '_' || typeof state.contentFilter[filterType] === 'function') {
					continue;
				}

				filterSources[filterType] = this.getFilterSource(filterType);
			}
		
			return (
				React.DOM.table({id: "log-table-header", className: "table table-hover"}, 
					React.DOM.thead(null, 
						React.DOM.tr(null, 
							React.DOM.th({className: "app-table-time"}, "Time"), 
							React.DOM.th({className: "app-table-component"}, "Component"), 
							React.DOM.th({className: "app-table-message"}, "Message")
						), 
						React.DOM.tr(null, 
							React.DOM.td(null, 
								HistoryInput({source: filterSources.time})
							), 
							React.DOM.td(null, 
								HistoryInput({source: filterSources.component})
							), 
							React.DOM.td(null, 
								HistoryInput({source: filterSources.message})
							)
						)
					)
				)
			);
		}
	});
	
	return LogHeaderTable;
});