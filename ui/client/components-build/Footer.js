/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('FooterComponent');

	var Footer = React.createClass({displayName: 'Footer',
		render: function () {
			log.info('render');
		
			return (
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
			);
		}
	});
	
	return Footer;
});