/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/State',
	'src/EventHub',
	'src/Util',
	'models/LogEntryFilter',
	'models/LogEntriesModel',
	'components/LogContentsTable',
	'components/LogHeaderTable'
], function(React, logger, state, eventHub, util, LogEntryFilter, logEntries, LogContentsTable, LogHeaderTable) {
	'use strict';
	
	var log = logger.get('ContentsComponent'),
		updateInterval;

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
				function() {
					util.performDelayed('update-log-entries', function() {
						this.updateLogEntries();
					}.bind(this), 100);
				}.bind(this)
			);

			eventHub.on(eventHub.Intent.CLEAR_MESSAGES, function() {
				logEntries.clear();
			}.bind(this));

			updateInterval = window.setInterval(function() {
				this.updateLogEntries();
			}.bind(this), 60 * 1000);
		},
		
		componentWillUnmount: function() {
			window.clearInterval(updateInterval);
		},

		componentDidUpdate: function() {
			var contentsBody = this.refs.contentsBody.getDOMNode();

			if (this.state.wasLogAtBottom) {
				this.scrollToBottom(contentsBody);
			}
		},

		updateLogEntries: function() {
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

		clearMessages: function() {
			eventHub.emit(eventHub.Intent.CLEAR_MESSAGES);
		},

		reloadTarget: function() {
			eventHub.emit(eventHub.Intent.CLEAR_MESSAGES);
			eventHub.emit(eventHub.Intent.RELOAD_TARGET);
		},

		render: function () {
			log.info('render');
		
			return (
				<div className="container-fluid app-contents">
					<div className="btn-group app-clear-btn">
						<button type="button" className="btn btn-sm btn-default" onClick={this.clearMessages}>Clear messages</button>
						<button type="button" className="btn btn-sm btn-default" onClick={this.reloadTarget}>Reload target</button>
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