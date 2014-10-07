/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/State',
	'src/EventHub',
	'components/HistoryInput'
], function(React, logger, state, eventHub, HistoryInput) {
	'use strict';
	
	var log = logger.get('FooterComponent');

	var Footer = React.createClass({displayName: 'Footer',

		componentDidMount: function() {
			eventHub.on(eventHub.Change.EXECUTE_JAVASCRIPT, function() {
				this.forceUpdate();

				this.x(state.executeJavascript.value);
			}.bind(this));
		},

		x: function(value) {
			log.info('x', value);
		},

		render: function () {
			log.info('render');

			var executeJavascriptSource = {
				getLabels: function() {
					return {
						placeholder: 'Execute remote JavaScript',
						clear: 'clear history'
					};
				}.bind(this),

				getValue: function() {
					return state.executeJavascript.value;
				}.bind(this),

				onValueChange: function(newValue) {
					state.executeJavascript.value = newValue;
				}.bind(this),

				onValueBlur: function(value) {
					var alreadyExists = state.executeJavascript.history.indexOf(value) !== -1;

					if (!alreadyExists && value.length > 0) {
						state.executeJavascript.history.push(value);
					}

					if (state.executeJavascript.history.length > 5) {
						state.executeJavascript.history.shift();
					}
				}.bind(this),

				getOptions: function() {
					return state.executeJavascript.history;
				}.bind(this),

				selectOption: function(index) {
					log.info('select: "' + state.executeJavascript.history[index] + '"');

					state.executeJavascript.value = state.executeJavascript.history[index];
				}.bind(this),

				removeOption: function(index) {
					log.info('remove: "' + state.executeJavascript.history[index] + '"');

					state.executeJavascript.history.splice(index, 1);
				}.bind(this),

				clearOptions: function() {
					log.info('clear options for ' + filterType);

					state.executeJavascript.history = [];
				}.bind(this),

				getSettings: function() {
					return {
						dropdownAlign: 'right',
						dropup: true
					}
				}.bind(this)
			};
		
			return (
				React.DOM.div({className: "navbar navbar-default navbar-fixed-bottom app-footer", role: "navigation"}, 
					React.DOM.div({className: "container-fluid app-navbar-container"}, 
						React.DOM.form({className: "app-footer-form"}, 
							React.DOM.div({className: "row"}, 
								React.DOM.div({className: "form-group col-xs-12"}, 
									HistoryInput({source: executeJavascriptSource})
								)
							)
						)
					)
				)
			);
		}
	});
	
	return Footer;
});