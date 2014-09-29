/** @jsx React.DOM */
define([
	'React',
	'components/ServerForm',
	'logviking/Logger',
	'src/Config'
], function(React, ServerForm, logger, config) {
	'use strict';

	var log = logger.get('ApplicationComponent');

	var Application = React.createClass({displayName: 'Application',

		onServerListen: function(host, port) {
			log.info('onServerListen: ' + host + ':' + port);
		},

		render: function () {
			return (
				React.DOM.div(null, 
					React.DOM.div({className: "navbar navbar-default navbar-fixed-top app-header", role: "navigation"}, 
						React.DOM.div({className: "container-fluid app-navbar-container"}, 
							React.DOM.form({className: "navbar-form navbar-left app-filter-form"}, 
								React.DOM.div({className: "btn-group app-type-filter"}, 
									React.DOM.button({type: "button", className: "btn btn-default app-filter-log"}, "log ", React.DOM.sup(null, "2")), 
									React.DOM.button({type: "button", className: "btn btn-default app-filter-info"}, "info ", React.DOM.sup(null, "5")), 
									React.DOM.button({type: "button", className: "btn btn-default app-filter-warn active"}, "warn"), 
									React.DOM.button({type: "button", className: "btn btn-default app-filter-error active"}, "error"), 
									React.DOM.button({type: "button", className: "btn btn-default app-filter-javascript"}, "javascript ", React.DOM.sup(null, "22"))
								), 
								React.DOM.button({type: "button", className: "btn btn-link"}, "Clear filter")
							), 
							ServerForm({data: config.server, onListen: this.onServerListen})
						)
					), 

					React.DOM.div({className: "container-fluid app-contents"}, 
						React.DOM.div({className: "btn-group app-clear-btn"}, 
							React.DOM.button({type: "button", className: "btn btn-sm btn-default"}, "Clear messages"), 
							React.DOM.button({type: "button", className: "btn btn-sm btn-default"}, "Reload target")
						), 

						React.DOM.div({className: "app-content-header"}, 
							React.DOM.table({className: "table table-hover"}, 
								React.DOM.thead(null, 
									React.DOM.tr(null, 
										React.DOM.th({className: "app-table-time"}, "Time"), 
										React.DOM.th({className: "app-table-component"}, "Component"), 
										React.DOM.th({className: "app-table-message"}, "Message")
									), 
									React.DOM.tr(null, 
										React.DOM.td(null, 
											React.DOM.div({className: "input-group"}, 
												React.DOM.input({type: "text", className: "form-control", defaultValue: "5m"}), 
												React.DOM.div({className: "input-group-btn"}, 
													React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, React.DOM.span({className: "caret"})), 
													React.DOM.ul({className: "dropdown-menu dropdown-menu-right", role: "menu"}, 
														React.DOM.li(null, React.DOM.a({href: "#"}, "60 seconds")), 
														React.DOM.li(null, React.DOM.a({href: "#"}, "2 minutes")), 
														React.DOM.li(null, React.DOM.a({href: "#"}, "10 minutes")), 
														React.DOM.li(null, React.DOM.a({href: "#"}, "all"))
													)
												)
											)
										), 
										React.DOM.td(null, 
											React.DOM.div({className: "app-clearable-input"}, 
												React.DOM.div({className: "input-group"}, 
													React.DOM.input({type: "text", className: "form-control", placeholder: "Filter by component"}), 
													React.DOM.div({className: "input-group-btn app-dropdown-with-buttons"}, 
														"/* check out https://codemirror.net/doc/manual.html#addon_javascript-hint */", 
														React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, React.DOM.span({className: "caret"})), 
														React.DOM.ul({className: "dropdown-menu dropdown-menu-right", role: "menu"}, 
															React.DOM.li(null, 
																React.DOM.a({href: "#"}, "player"), 
																React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																	React.DOM.span({className: "glyphicon glyphicon-remove"})
																)
															), 
															React.DOM.li(null, 
																React.DOM.a({href: "#"}, "ui"), 
																React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																	React.DOM.span({className: "glyphicon glyphicon-remove"})
																)
															), 
															React.DOM.li(null, 
																React.DOM.a({href: "#"}, "boostrapper"), 
																React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																	React.DOM.span({className: "glyphicon glyphicon-remove"})
																)
															), 
															React.DOM.li({className: "divider"}), 
															React.DOM.li(null, React.DOM.a({href: "#"}, "clear history"))
														)
													)
												), 
												React.DOM.a({className: "btn app-clear-command-btn", href: "#"}, React.DOM.i({className: "glyphicon glyphicon-remove-circle"}))
											)
										), 
										React.DOM.td(null, 
											React.DOM.div({className: "app-clearable-input"}, 
												React.DOM.div({className: "input-group"}, 
													React.DOM.input({type: "text", className: "form-control", placeholder: "Filter by message"}), 
													React.DOM.div({className: "input-group-btn app-dropdown-with-buttons"}, 
														React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, React.DOM.span({className: "caret"})), 
														React.DOM.ul({className: "dropdown-menu dropdown-menu-right", role: "menu"}, 
															React.DOM.li(null, 
																React.DOM.a({href: "#"}, "player"), 
																React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																	React.DOM.span({className: "glyphicon glyphicon-remove"})
																)
															), 
															React.DOM.li(null, 
																React.DOM.a({href: "#"}, "play"), 
																React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																	React.DOM.span({className: "glyphicon glyphicon-remove"})
																)
															), 
															React.DOM.li(null, 
																React.DOM.a({href: "#"}, "pause|stop"), 
																React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																	React.DOM.span({className: "glyphicon glyphicon-remove"})
																)
															), 
															React.DOM.li({className: "divider"}), 
															React.DOM.li(null, React.DOM.a({href: "#"}, "clear history"))
														)
													)
												), 
												React.DOM.a({className: "btn app-clear-command-btn", href: "#"}, React.DOM.i({className: "glyphicon glyphicon-remove-circle"}))
											)
										)
									)
								)
							)
						), 
						React.DOM.div({className: "app-contents-body"}, 
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
						)
					), 

					React.DOM.div({className: "navbar navbar-default navbar-fixed-bottom app-footer", role: "navigation"}, 
						React.DOM.div({className: "container-fluid app-navbar-container"}, 
							React.DOM.form({className: "app-footer-form"}, 
								React.DOM.div({className: "row"}, 
									React.DOM.div({className: "form-group col-xs-12"}, 
										React.DOM.div({className: "app-clearable-input"}, 
											React.DOM.div({className: "input-group"}, 
												React.DOM.input({className: "form-control", type: "text", placeholder: "Execute remote JavaScript"}), 
												React.DOM.div({className: "input-group-btn dropup app-dropdown-with-buttons"}, 
													React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, React.DOM.span({className: "caret"})), 
													React.DOM.ul({className: "dropdown-menu dropdown-menu-right", role: "menu"}, 
														React.DOM.li(null, 
															React.DOM.a({href: "#"}, "window.location.href"), 
															React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																React.DOM.span({className: "glyphicon glyphicon-remove"})
															)
														), 
														React.DOM.li(null, 
															React.DOM.a({href: "#"}, "player.pause()"), 
															React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																React.DOM.span({className: "glyphicon glyphicon-remove"})
															)
														), 
														React.DOM.li(null, 
															React.DOM.a({href: "#"}, "history.back()"), 
															React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn"}, 
																React.DOM.span({className: "glyphicon glyphicon-remove"})
															)
														), 
														React.DOM.li({className: "divider"}), 
														React.DOM.li(null, React.DOM.a({href: "#"}, "clear history"))
													)
												)
											), 
											React.DOM.a({className: "btn app-clear-command-btn", href: "#"}, React.DOM.i({className: "glyphicon glyphicon-remove-circle"}))
										)
									)
								)
							)
						)
					)
				)
			);
		}
	});
	
	return Application;
});