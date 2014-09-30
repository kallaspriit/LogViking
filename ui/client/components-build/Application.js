/** @jsx React.DOM */
define([
	'React',
	'components/Header',
	'components/Contents',
	'components/Footer',
	'logviking/Logger',
	'src/Config'
], function(React, Header, Contents, Footer, logger, config) {
	'use strict';

	var log = logger.get('ApplicationComponent');

	var Application = React.createClass({displayName: 'Application',

		render: function () {
			log.info('render');

			return (
				React.DOM.div(null, 
					Header({config: config}), 
					Contents({config: config, logEntries: this.props.logEntries}), 
					Footer({config: config})
				)
			);
		}
	});
	
	return Application;
});