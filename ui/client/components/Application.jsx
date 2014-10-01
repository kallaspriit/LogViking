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

	var Application = React.createClass({

		render: function () {
			log.info('render');

			return (
				<div>
					<Header/>
					<Contents/>
					<Footer/>
				</div>
			);
		}
	});
	
	return Application;
});