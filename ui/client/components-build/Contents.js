/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'models/LogEntriesModel',
	'components/LogContentsTable',
	'components/LogHeaderTable'
], function(React, logger, logEntries, LogContentsTable, LogHeaderTable) {
	'use strict';
	
	var log = logger.get('ContentsComponent');

	var Contents = React.createClass({displayName: 'Contents',

		getInitialState: function() {
			return {
				logEntries: [],
				wasLogAtBottom: false
			}
		},

		componentDidMount: function() {
			logEntries.on(
				[logEntries.Event.ENTRY_ADDED, logEntries.Event.CLEARED],
				this.updateLogEntries
			);
		},

		componentDidUpdate: function() {
			var contentsBody = this.refs.contentsBody.getDOMNode();

			if (this.state.wasLogAtBottom) {
				this.scrollToBottom(contentsBody);
			}
		},

		updateLogEntries: function(entry) {
			var contentsBody = this.refs.contentsBody.getDOMNode();

			this.setState({
				wasLogAtBottom: this.isAtBottom(contentsBody),
				logEntries: logEntries.getFilteredEntries()
			});
		},

		scrollToBottom: function(el) {
			$(el).scrollTop(el.scrollHeight);
		},

		isAtBottom: function(el) {
			return $(el).scrollTop() + $(el).innerHeight() >= el.scrollHeight;
		},

		render: function () {
			log.info('render');
		
			return (
				React.DOM.div({className: "container-fluid app-contents"}, 
					React.DOM.div({className: "btn-group app-clear-btn"}, 
						React.DOM.button({type: "button", className: "btn btn-sm btn-default"}, "Clear messages"), 
						React.DOM.button({type: "button", className: "btn btn-sm btn-default"}, "Reload target")
					), 

					React.DOM.div({className: "app-content-header"}, 
						LogHeaderTable(null)
					), 
					React.DOM.div({className: "app-contents-body", ref: "contentsBody"}, 
						LogContentsTable({logEntries: this.state.logEntries})
					)
				)
			);
		}
	});
	
	return Contents;
});