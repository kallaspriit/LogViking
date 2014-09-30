/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/Formatter'
], function(React, logger, formatter) {
	'use strict';
	
	var log = logger.get('LogContentsTableComponent');

	var LogContentsTable = React.createClass({
		render: function () {
			log.info('render', this.props.logEntries.length);

			var rows = this.props.logEntries.map(function(entry) {
				return (
					<tr key={entry.id} className={'app-entry-' + entry.type}>
						<td>2 minute ago</td>
						<td>{entry.component}</td>
						<td>{entry.data}</td>
					</tr>
				);
			});
		
			return (
				<table className="table table-hover app-log-table">
					<tbody>
						{rows}
					</tbody>
				</table>
			);
		}
	});
	
	return LogContentsTable;
});