/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
], function(React, logger) {
	'use strict';

	var log = logger.get('ServerFormComponent');

	var ServerForm = React.createClass({

		mixins: [React.addons.LinkedStateMixin],

		propTypes: {
			data: React.PropTypes.shape({
				host: React.PropTypes.string.isRequired,
				port: React.PropTypes.number.isRequired,
				hostHistory: React.PropTypes.array.isRequired,
				portHistory: React.PropTypes.array.isRequired
			}).isRequired,
			onListen: React.PropTypes.func.isRequired
		},

		getInitialState: function() {
			return {
				hostText: '',
				portText: ''
			};
		},

		handlePortChange: function(event) {
			var value = parseInt(event.target.value, 10);

			if (isNaN(value)) {
				value = '';
			}

			this.setState({
				portText: value
			});
		},

		addHost: function(e) {
			log.info('add host: "' + this.state.hostText + '"');

			this.props.data.hostHistory.push(this.state.hostText);
			this.props.data.host = this.state.hostText;

			// TODO reconnect

			this.setState({ hostText: '' });

			e.preventDefault();
			e.stopPropagation();
		},

		listen: function(e) {
			// TODO use selected host/port
			this.props.onListen(this.props.data.host, this.props.data.port);

			e.preventDefault();
		},

		render: function () {
			var hostHistoryNodes = this.props.data.hostHistory.map(function(host, index) {
					var removeHostHistoryItem = function(e) {
							log.info('remove host history item: ' + this.props.data.hostHistory[index]);

							this.props.data.hostHistory.splice(index, 1);

							this.forceUpdate();

							e.preventDefault();
							e.stopPropagation();
						}.bind(this),

						selectHost = function(e) {
							log.info('selecting host: ' + host);

							this.props.data.host = host;

							this.forceUpdate();

							e.preventDefault();
							e.stopPropagation();
						}.bind(this);

					return (
						<li>
							<a href="#" onClick={selectHost}>{host}</a>
							<button type="button" className="btn btn-link btn-sm app-dropdown-btn" title="Remove from history" onClick={removeHostHistoryItem}>
								<span className="glyphicon glyphicon-remove"></span>
							</button>
						</li>
					);
				}.bind(this)),
				portHistoryNodes = this.props.data.portHistory.map(function(port) {
					return (
						<li>
							<a href="#">{port}</a>
							<button type="button" className="btn btn-link btn-sm app-dropdown-btn" title="Remove from history">
								<span className="glyphicon glyphicon-remove"></span>
							</button>
						</li>
					);
				}.bind(this));

			return (
				<form className="navbar-form navbar-right form-inline">
					<div className="form-group">
						<div className="btn-group">
							<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
								Host: {this.props.data.host} <span className="caret"></span>
							</button>
							<ul className="dropdown-menu app-dropdown-with-buttons" role="menu">
								{hostHistoryNodes}
								{hostHistoryNodes.length > 0 ? <li className="divider"></li> : ''}
								<li>
									<div className="form-group">
										<div className="input-group input-group-sm">
											<input type="text" className="form-control" placeholder="New host" valueLink={this.linkState('hostText')}/>
											<span className="input-group-btn">
												<button className="btn btn-default" type="button" onClick={this.addHost}>OK</button>
											</span>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					{' '}
					<div className="form-group">
						<div className="btn-group">
							<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
								Port: 2222 <span className="caret"></span>
							</button>
							<ul className="dropdown-menu app-dropdown-with-buttons" role="menu">
								{portHistoryNodes}
								{portHistoryNodes.length > 0 ? <li className="divider"></li> : ''}
								<li>
									<div className="form-group">
										<div className="input-group input-group-sm">
											<input type="text" className="form-control" placeholder="New port" value={this.state.portText} onChange={this.handlePortChange}/>
											<span className="input-group-btn">
												<button className="btn btn-default" type="button" onClick={this.addPort}>OK</button>
											</span>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					{' '}
					<button type="submit" className="btn btn-primary" onClick={this.listen}>Listen</button>
				</form>
			);
		}
	});
	
	return ServerForm;
});