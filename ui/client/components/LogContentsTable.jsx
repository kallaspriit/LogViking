/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('LogContentsTableComponent');

	var LogContentsTable = React.createClass({

		componentDidMount: function() {

		},

		render: function () {
			log.info('render');
		
			return (
				<table className="table table-hover app-log-table">
					<tbody>
						<tr className="app-entry-log">
							<td className="app-table-time">5 minutes ago</td>
							<td className="app-table-component">Player</td>
							<td className="app-table-message">
								Test
							</td>
						</tr>
						<tr className="app-entry-info">
							<td>2 minute ago</td>
							<td>Player</td>
							<td>Info example</td>
						</tr>
						<tr className="app-entry-warn">
							<td>1 minute ago</td>
							<td>Player</td>
							<td>Warning example</td>
						</tr>
						<tr className="app-entry-error">
							<td>seconds ago</td>
							<td>Player</td>
							<td>Error example</td>
						</tr>
						<tr className="app-entry-javascript">
							<td>just now</td>
							<td>JavaScript</td>
							<td>JavaScript example.</td>
						</tr>
						<tr className="app-entry-info">
							<td>2 minutes ago</td>
							<td>Player</td>
							<td>Playing http://example.com/movies.m3u8</td>
						</tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
						<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
					</tbody>
				</table>
			);
		}
	});
	
	return LogContentsTable;
});