/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/State',
	'src/EventHub',
	'models/LogEntryFilter',
	'models/LogEntriesModel',
	'components/LogContentsTable',
	'components/LogHeaderTable'
], function(React, logger, state, eventHub, LogEntryFilter, logEntries, LogContentsTable, LogHeaderTable) {
	'use strict';
	
	var log = logger.get('ContentsComponent');

	var Contents = React.createClass({

		getInitialState: function() {
			return {
				logEntries: [],
				wasLogAtBottom: false
			}
		},

		componentDidMount: function() {
			eventHub.on(
				[eventHub.Change.TYPE_FILTER, eventHub.Change.CONTENT_FILTER, eventHub.Change.LOG_ENTRIES],
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
			var filter = new LogEntryFilter({
					type: {
						log: state.typeFilter.log,
						info: state.typeFilter.info,
						warn: state.typeFilter.warn,
						error: state.typeFilter.error,
						javascript: state.typeFilter.javascript,
					},
					time: state.contentFilter.time.value,
					component: state.contentFilter.component.value,
					message: state.contentFilter.message.value,
				}),
				contentsBody = this.refs.contentsBody.getDOMNode();

			this.setState({
				wasLogAtBottom: this.isAtBottom(contentsBody),
				logEntries: logEntries.getFilteredEntries(filter)
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
				<div className="container-fluid app-contents">
					<div className="btn-group app-clear-btn">
						<button type="button" className="btn btn-sm btn-default">Clear messages</button>
						<button type="button" className="btn btn-sm btn-default">Reload target</button>
					</div>

					<div className="app-content-header">
						<LogHeaderTable/>
					</div>
					<div className="app-contents-body" ref="contentsBody">
						<LogContentsTable logEntries={this.state.logEntries}/>
					</div>
				</div>
			);
		}
	});
	
	return Contents;
});