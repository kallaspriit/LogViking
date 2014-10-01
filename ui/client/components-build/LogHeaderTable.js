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
		render: function () {
			log.info('render');

			var filterType,
				filterSources = {};

			for (filterType in state.contentFilter) {
				if (filterType.substr(0, 1) === '_' || typeof state.contentFilter[filterType] === 'function') {
					continue;
				}

				filterSources[filterType] = {
					getLabels: function() {
						return {
							placeholder: 'Filter by component',
							clear: 'clear history'
						};
					}.bind(this),

					getValue: function(filterType) {
						return state.contentFilter[filterType].value;
					}.bind(this, filterType),

					onValueChange: function(filterType, newValue) {
						state.contentFilter[filterType].value = newValue;
					}.bind(this, filterType),

					onValueBlur: function(filterType, value) {
						var alreadyExists = state.contentFilter[filterType].history.indexOf(value) !== -1;

						if (!alreadyExists && value.length > 0) {
							state.contentFilter[filterType].history.push(value);
						}

						if (state.contentFilter[filterType].history.length > 5) {
							state.contentFilter[filterType].history.shift();
						}
					}.bind(this, filterType),

					getOptions: function(filterType) {
						return state.contentFilter[filterType].history;
					}.bind(this, filterType),

					selectOption: function(filterType, index) {
						log.info('select ' + filterType + ': "' + state.contentFilter[filterType].history[index] + '"');

						state.contentFilter[filterType].value = state.contentFilter[filterType].history[index];
					}.bind(this, filterType),

					removeOption: function(filterType, index) {
						log.info('remove ' + filterType + ': "' + state.contentFilter[filterType].history[index] + '"');

						state.contentFilter[filterType].history.splice(index, 1);
					}.bind(this, filterType),

					clearOptions: function(filterType, index) {
						log.info('clear options for ' + filterType);

						state.contentFilter[filterType].history = [];
					}.bind(this, filterType)
				}
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
								React.DOM.div({className: "input-group"}, 
									React.DOM.input({type: "text", className: "form-control", defaultValue: "5m"}), 
									React.DOM.div({className: "input-group-btn"}, 
										React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, React.DOM.span({className: "caret"})), 
										React.DOM.ul({className: "dropdown-menu dropdown-menu-right", role: "menu"}, 
											React.DOM.li(null, React.DOM.a({href: "#"}, "60 seconds")), 
											React.DOM.li(null, React.DOM.a({href: "#"}, "2 minutes")), 
											React.DOM.li(null, React.DOM.a({href: "#"}, "10 minutes")), 
											React.DOM.li(null, React.DOM.a({href: "#"}, "all"))
										)
									)
								)
							), 
							React.DOM.td(null, 
								HistoryInput({source: filterSources.component})
							), 
							React.DOM.td(null, 
								React.DOM.div({className: "app-clearable-input"}, 
									React.DOM.div({className: "input-group"}, 
										React.DOM.input({type: "text", className: "form-control", placeholder: "Filter by message"}), 
										React.DOM.div({className: "input-group-btn app-dropdown-with-buttons"}, 
											React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, React.DOM.span({className: "caret"})), 
											React.DOM.ul({className: "dropdown-menu dropdown-menu-right", role: "menu"}, 
												React.DOM.li(null, 
													React.DOM.a({href: "#"}, "player"), 
													React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
														React.DOM.span({className: "glyphicon glyphicon-remove"})
													)
												), 
												React.DOM.li(null, 
													React.DOM.a({href: "#"}, "play"), 
													React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
														React.DOM.span({className: "glyphicon glyphicon-remove"})
													)
												), 
												React.DOM.li(null, 
													React.DOM.a({href: "#"}, "pause|stop"), 
													React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
														React.DOM.span({className: "glyphicon glyphicon-remove"})
													)
												), 
												React.DOM.li({className: "divider"}), 
												React.DOM.li(null, React.DOM.a({href: "#"}, "clear history"))
											)
										)
									), 
									React.DOM.a({className: "btn app-clear-command-btn", href: "#"}, React.DOM.i({className: "glyphicon glyphicon-remove-circle"}))
								)
							)
						)
					)
				)
			);
		}
	});
	
	return LogHeaderTable;
});