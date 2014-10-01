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

	var Contents = React.createClass({

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