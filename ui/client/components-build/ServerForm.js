/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
], function(React, logger) {
	'use strict';

	var log = logger.get('ServerFormComponent');

	var ServerForm = React.createClass({displayName: 'ServerForm',

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
						React.DOM.li(null, 
							React.DOM.a({href: "#", onClick: selectHost}, host), 
							React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn", title: "Remove from history", onClick: removeHostHistoryItem}, 
								React.DOM.span({className: "glyphicon glyphicon-remove"})
							)
						)
					);
				}.bind(this)),
				portHistoryNodes = this.props.data.portHistory.map(function(port) {
					return (
						React.DOM.li(null, 
							React.DOM.a({href: "#"}, port), 
							React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn", title: "Remove from history"}, 
								React.DOM.span({className: "glyphicon glyphicon-remove"})
							)
						)
					);
				}.bind(this));

			return (
				React.DOM.form({className: "navbar-form navbar-right form-inline"}, 
					React.DOM.div({className: "form-group"}, 
						React.DOM.div({className: "btn-group"}, 
							React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, 
								"Host: ", this.props.data.host, " ", React.DOM.span({className: "caret"})
							), 
							React.DOM.ul({className: "dropdown-menu app-dropdown-with-buttons", role: "menu"}, 
								hostHistoryNodes, 
								hostHistoryNodes.length > 0 ? React.DOM.li({className: "divider"}) : '', 
								React.DOM.li(null, 
									React.DOM.div({className: "form-group"}, 
										React.DOM.div({className: "input-group input-group-sm"}, 
											React.DOM.input({type: "text", className: "form-control", placeholder: "New host", valueLink: this.linkState('hostText')}), 
											React.DOM.span({className: "input-group-btn"}, 
												React.DOM.button({className: "btn btn-default", type: "button", onClick: this.addHost}, "OK")
											)
										)
									)
								)
							)
						)
					), 
					' ', 
					React.DOM.div({className: "form-group"}, 
						React.DOM.div({className: "btn-group"}, 
							React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, 
								"Port: 2222 ", React.DOM.span({className: "caret"})
							), 
							React.DOM.ul({className: "dropdown-menu app-dropdown-with-buttons", role: "menu"}, 
								portHistoryNodes, 
								portHistoryNodes.length > 0 ? React.DOM.li({className: "divider"}) : '', 
								React.DOM.li(null, 
									React.DOM.div({className: "form-group"}, 
										React.DOM.div({className: "input-group input-group-sm"}, 
											React.DOM.input({type: "text", className: "form-control", placeholder: "New port", value: this.state.portText, onChange: this.handlePortChange}), 
											React.DOM.span({className: "input-group-btn"}, 
												React.DOM.button({className: "btn btn-default", type: "button", onClick: this.addPort}, "OK")
											)
										)
									)
								)
							)
						)
					), 
					' ', 
					React.DOM.button({type: "submit", className: "btn btn-primary", onClick: this.listen}, "Listen")
				)
			);
		}
	});
	
	return ServerForm;
});