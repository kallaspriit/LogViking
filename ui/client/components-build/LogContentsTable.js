/** @jsx React.DOM */
define([
	'jquery',
	'React',
	'logviking/Logger',
	'src/Formatter'
], function($, React, logger, formatter) {
	'use strict';
	
	var log = logger.get('LogContentsTableComponent');

	var LogContentsTable = React.createClass({displayName: 'LogContentsTable',

		componentDidMount: function() {
			/*var $headerTable = $('#log-table-header'),
				$contentsTable = $(this.refs.table.getDOMNode());

			this.setColumnWidths($headerTable, $contentsTable);*/

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
					React.DOM.tr({key: entry.id, className: 'app-entry-' + entry.type}, 
						React.DOM.td(null, "2 minute ago"), 
						React.DOM.td(null, entry.component), 
						React.DOM.td({dangerouslySetInnerHTML: {__html: formatter.format(entry.data)}})
					)
				);
			});

			return (
				React.DOM.table({id: "log-table-contents", className: "table table-hover app-log-table", ref: "table"}, 
					React.DOM.tbody(null, 
						React.DOM.tr({className: "app-layout-row"}, 
							React.DOM.td(null), 
							React.DOM.td(null), 
							React.DOM.td(null)
						), 
						rows
					)
				)
			);
		}
	});
	
	return LogContentsTable;
});