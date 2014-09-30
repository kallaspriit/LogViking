/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/Formatter'
], function(React, logger, formatter) {
	'use strict';
	
	var log = logger.get('LogContentsTableComponent');

	var LogContentsTable = React.createClass({displayName: 'LogContentsTable',
		render: function () {
			log.info('render', this.props.logEntries.length);

			var rows = this.props.logEntries.map(function(entry) {
				return (
					React.DOM.tr({key: entry.id, className: 'app-entry-' + entry.type}, 
						React.DOM.td(null, "2 minute ago"), 
						React.DOM.td(null, entry.component), 
						React.DOM.td(null, entry.data)
					)
				);
			});
		
			return (
				React.DOM.table({className: "table table-hover app-log-table"}, 
					React.DOM.tbody(null, 
						rows
					)
				)
			);
		}
	});
	
	return LogContentsTable;
});