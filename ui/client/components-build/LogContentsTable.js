/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('LogContentsTableComponent');

	var LogContentsTable = React.createClass({displayName: 'LogContentsTable',

		componentDidMount: function() {

		},

		render: function () {
			log.info('render');
		
			return (
				React.DOM.table({className: "table table-hover app-log-table"}, 
					React.DOM.tbody(null, 
						React.DOM.tr({className: "app-entry-log"}, 
							React.DOM.td({className: "app-table-time"}, "5 minutes ago"), 
							React.DOM.td({className: "app-table-component"}, "Player"), 
							React.DOM.td({className: "app-table-message"}, 
								"Test"
							)
						), 
						React.DOM.tr({className: "app-entry-info"}, 
							React.DOM.td(null, "2 minute ago"), 
							React.DOM.td(null, "Player"), 
							React.DOM.td(null, "Info example")
						), 
						React.DOM.tr({className: "app-entry-warn"}, 
							React.DOM.td(null, "1 minute ago"), 
							React.DOM.td(null, "Player"), 
							React.DOM.td(null, "Warning example")
						), 
						React.DOM.tr({className: "app-entry-error"}, 
							React.DOM.td(null, "seconds ago"), 
							React.DOM.td(null, "Player"), 
							React.DOM.td(null, "Error example")
						), 
						React.DOM.tr({className: "app-entry-javascript"}, 
							React.DOM.td(null, "just now"), 
							React.DOM.td(null, "JavaScript"), 
							React.DOM.td(null, "JavaScript example.")
						), 
						React.DOM.tr({className: "app-entry-info"}, 
							React.DOM.td(null, "2 minutes ago"), 
							React.DOM.td(null, "Player"), 
							React.DOM.td(null, "Playing http://example.com/movies.m3u8")
						), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "paused")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "opening \"http://example.com\"")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "playing")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "seeking")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "paused")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "opening \"http://example.com\"")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "playing")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "seeking")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "paused")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "opening \"http://example.com\"")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "playing")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "seeking")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "paused")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "opening \"http://example.com\"")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "playing")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "seeking")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "paused")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "opening \"http://example.com\"")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "playing")), 
						React.DOM.tr({className: "app-entry-log"}, React.DOM.td(null, "1 minute ago"), React.DOM.td(null, "Player"), React.DOM.td(null, "seeking"))
					)
				)
			);
		}
	});
	
	return LogContentsTable;
});