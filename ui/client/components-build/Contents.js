/** @jsx React.DOM */
define([
	'React',
	'components/LogContentsTable',
	'logviking/Logger'
], function(React, LogContentsTable, logger) {
	'use strict';
	
	var log = logger.get('ContentsComponent');

	var Contents = React.createClass({displayName: 'Contents',
		render: function () {
			log.info('render');
		
			return (
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
						LogContentsTable({logEntries: this.props.logEntries})
					)
				)
			);
		}
	});
	
	return Contents;
});