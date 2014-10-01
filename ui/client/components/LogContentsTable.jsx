/** @jsx React.DOM */
define([
	'jquery',
	'React',
	'logviking/Logger',
	'src/Formatter'
], function($, React, logger, formatter) {
	'use strict';
	
	var log = logger.get('LogContentsTableComponent');

	var LogContentsTable = React.createClass({

		componentDidMount: function() {
			this.updateTableColumnWidths();

			$(window).resize(this.updateTableColumnWidths);
		},

		updateTableColumnWidths: function() {
			var $headerTable = $('#log-table-header'),
				$contentsTable = $(this.refs.table.getDOMNode()),
				columnWidths = this.getColumnWidths($headerTable),
				i;

			log.info('columnWidths', columnWidths);

			for (i = 0; i < columnWidths.length; i++) {
				$contentsTable.find('TR:eq(0) TD:eq(' + i + ')').attr('width', columnWidths[i]);
			}
		},

		getColumnWidths: function($headerTable) {
			var self = this,
				columns = $headerTable.find('TR:eq(0) TH'),
				columnCount = columns.length,
				columnWidths = [],
				i;

			for (i = 0; i < columnCount - 1; i++) {
				columnWidths.push($(columns[i]).innerWidth());
			}

			return columnWidths;
		},

		render: function () {
			log.info('render', this.props.logEntries.length);

			var rows = this.props.logEntries.map(function(entry) {
				return (
					<tr key={entry.id} className={'app-entry-' + entry.type}>
						<td>2 minute ago</td>
						<td>{entry.component}</td>
						<td dangerouslySetInnerHTML={{__html: formatter.format(entry.data)}}></td>
					</tr>
				);
			});

			return (
				<table id="log-table-contents" className="table table-hover app-log-table" ref="table">
					<tbody>
						<tr className="app-layout-row">
							<td></td>
							<td></td>
							<td></td>
						</tr>
						{rows}
					</tbody>
				</table>
			);
		}
	});
	
	return LogContentsTable;
});