/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/State',
	'components/Header',
	'components/Contents',
	'components/Footer'
], function(React, logger, state, Header, Contents, Footer) {
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