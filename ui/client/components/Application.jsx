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
					<Header config={config}/>
					<Contents config={config} logEntries={this.props.logEntries}/>
					<Footer config={config}/>
				</div>
			);
		}
	});
	
	return Application;
});