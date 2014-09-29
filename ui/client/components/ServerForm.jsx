/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'components/HistoryButton'
], function(React, logger, HistoryButton) {
	'use strict';

	var log = logger.get('ServerFormComponent');

	var ServerForm = React.createClass({

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

			e.preventDefault();
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
					}.bind(this),

					addOption: function(name) {
						log.info('add host: "' + name + '"');

						this.props.data.hostHistory.push(name);
						this.props.data.host = name;
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
					}.bind(this),

					addOption: function(name) {
						log.info('add port: "' + name + '"');

						this.props.data.portHistory.push(name);
						this.props.data.port = name;
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
				};

			return (
				<form className="navbar-form navbar-right form-inline">
					<HistoryButton source={hostButtonSource}/>
					{' '}
					<HistoryButton source={portButtonSource}/>
					{' '}
					<button type="submit" className="btn btn-primary" onClick={this.listen}>Listen</button>
				</form>
			);
		}
	});
	
	return ServerForm;
});