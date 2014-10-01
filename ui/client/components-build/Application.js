/** @jsx React.DOM */
define([
	'React',
	'components/Header',
	'components/Contents',
	'components/Footer',
	'logviking/Logger',
	'src/State'
], function(React, Header, Contents, Footer, logger, state) {
	'use strict';

	var log = logger.get('ApplicationComponent');

	var Application = React.createClass({displayName: 'Application',

		render: function () {
			log.info('render');

			return (
				React.DOM.div(null, 
					Header(null), 
					Contents(null), 
					Footer(null)
				)
			);
		}
	});
	
	return Application;
});