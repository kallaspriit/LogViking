/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/Server',
	'components/HistoryButton'
], function(React, logger, server, HistoryButton) {
	'use strict';

	var log = logger.get('ServerFormComponent');

	var ServerForm = React.createClass({displayName: 'ServerForm',

		propTypes: {
			data: React.PropTypes.shape({
				host: React.PropTypes.string.isRequired,
				port: React.PropTypes.number.isRequired,
				hostHistory: React.PropTypes.array.isRequired,
				portHistory: React.PropTypes.array.isRequired
			}).isRequired
		},

		listen: function(e) {
			// TODO use selected host/port
			log.info('listen', this.props.data.host, this.props.data.port);

			if (server.isStarted()) {
				server.stop();
			}

			server.listen(this.props.data.host, this.props.data.port);

			this.forceUpdate();

			e.preventDefault();
		},

		stop: function(e) {
			// TODO use selected host/port
			log.info('stop server');

			if (server.isStarted()) {
				server.stop();
			}

			this.forceUpdate();

			e.preventDefault();
		},

		restartServer: function() {
			log.info('restarting server');

			if (server.isStarted()) {
				server.stop();
			}

			server.listen(this.props.data.host, this.props.data.port);
		},

		render: function () {
			log.info('render');

			var hostButtonSource = {
					getLabels: function() {
						return {
							name: 'Host',
							placeholder: 'Add host'
						};
					}.bind(this),

					getCurrentValue: function() {
						return this.props.data.host;
					}.bind(this),

					getOptions: function() {
						return this.props.data.hostHistory;
					}.bind(this),

					selectOption: function(index) {
						log.info('select host: "' + this.props.data.hostHistory[index] + '"');

						this.props.data.host = this.props.data.hostHistory[index];

						if (server.isStarted()) {
							this.restartServer();
							this.forceUpdate();
						}
					}.bind(this),

					addOption: function(name) {
						log.info('add host: "' + name + '"');

						this.props.data.hostHistory.push(name);
						this.props.data.host = name;

						this.restartServer();
					}.bind(this),

					removeOption: function(index) {
						log.info('remove host: "' + this.props.data.hostHistory[index] + '"');

						this.props.data.hostHistory.splice(index, 1);
					}.bind(this)
				},
				portButtonSource = {
					getLabels: function() {
						return {
							name: 'Port',
							placeholder: 'Add port'
						};
					}.bind(this),

					getCurrentValue: function() {
						return this.props.data.port;
					}.bind(this),

					getOptions: function() {
						return this.props.data.portHistory;
					}.bind(this),

					selectOption: function(index) {
						log.info('select port: "' + this.props.data.portHistory[index] + '"');

						this.props.data.port = this.props.data.portHistory[index];

						if (server.isStarted()) {
							this.restartServer();
							this.forceUpdate();
						}
					}.bind(this),

					addOption: function(name) {
						log.info('add port: "' + name + '"');

						this.props.data.portHistory.push(name);
						this.props.data.port = name;

						this.restartServer();
					}.bind(this),

					removeOption: function(index) {
						log.info('remove port: "' + this.props.data.portHistory[index] + '"');

						this.props.data.portHistory.splice(index, 1);
					}.bind(this),

					transformValue: function(value) {
						var transformedValue = parseInt(value, 10);

						if (isNaN(transformedValue)) {
							transformedValue = '';
						}

						return transformedValue;
					}.bind(this)
				},
				started = server.isStarted(),
				actionBtn = started
					? React.DOM.button({type: "submit", className: "btn btn-primary", onClick: this.stop}, "Stop")
					: React.DOM.button({type: "submit", className: "btn btn-primary", onClick: this.listen}, "Listen");

			return (
				React.DOM.form({className: "navbar-form navbar-right form-inline app-server-form"}, 
					React.DOM.div({className: "btn-group"}, 
						HistoryButton({source: hostButtonSource}), 
						HistoryButton({source: portButtonSource}), 
						actionBtn
					)
				)
			);
		}
	});
	
	return ServerForm;
});