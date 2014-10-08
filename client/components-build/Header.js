/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'components/ServerForm',
	'components/StatusBar',
	'components/TypeFilter'
], function(React, logger, ServerForm, StatusBar, TypeFilter) {
	'use strict';
	
	var log = logger.get('HeaderComponent');

	var Header = React.createClass({displayName: 'Header',

		render: function () {
			log.info('render');
		
			return (
				React.DOM.div({className: "navbar navbar-default navbar-fixed-top app-header", role: "navigation"}, 
					React.DOM.div({className: "container-fluid app-navbar-container"}, 
						TypeFilter(null), 
						ServerForm(null), 
						StatusBar(null)
						/*<div className="app-logo">LogViking</div>*/
					)
				)
			);
		}
	});
	
	return Header;
});