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

	var Application = React.createClass({

		render: function () {
			log.info('render');

			return (
				<div>
					<Header data={config}/>
					<Contents data={config}/>
					<Footer data={config}/>
				</div>
			);
		}
	});
	
	return Application;
});