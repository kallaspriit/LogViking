/** @jsx React.DOM */
define([
	'React',
	'components/ServerForm',
	'components/StatusBar',
	'components/TypeFilter',
	'logviking/Logger'
], function(React, ServerForm, StatusBar, TypeFilter, logger) {
	'use strict';
	
	var log = logger.get('HeaderComponent');

	var Header = React.createClass({

		render: function () {
			log.info('render');
		
			return (
				<div className="navbar navbar-default navbar-fixed-top app-header" role="navigation">
					<div className="container-fluid app-navbar-container">
						<TypeFilter/>
						<ServerForm/>
						<StatusBar/>
						{/*<div className="app-logo">LogViking</div>*/}
					</div>
				</div>
			);
		}
	});
	
	return Header;
});