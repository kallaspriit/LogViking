/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('HistoryButtonComponent');

	var HistoryButton = React.createClass({displayName: 'HistoryButton',

		propTypes: {
			source: React.PropTypes.shape({
				getLabels: React.PropTypes.func.isRequired,
				getCurrentValue: React.PropTypes.func.isRequired,
				getOptions: React.PropTypes.func.isRequired,
				selectOption: React.PropTypes.func.isRequired,
				addOption: React.PropTypes.func.isRequired,
				removeOption: React.PropTypes.func.isRequired,
				transformValue: React.PropTypes.func
			})
		},

		getInitialState: function() {
			return {
				text: ''
			};
		},

		onTextChange: function(e) {
			var value = e.target.value;

			if (typeof this.props.source.transformValue === 'function') {
				value = this.props.source.transformValue(value);
			}

			this.setState({ text: value });
		},

		addOption: function(e) {
			log.info('add option: "' + this.state.text + '"');

			this.props.source.addOption(this.state.text);

			this.setState({ text: '' });

			e.preventDefault();
			e.stopPropagation();
		},

		render: function () {
			log.info('render');

			var currentValue = this.props.source.getCurrentValue(),
				options = this.props.source.getOptions(),
				labels = this.props.source.getLabels(),
				optionNodes;

			optionNodes = options.map(function(option, index) {
				var selectOption = function(e) {
						log.info('selecting option: ' + option);

						this.props.source.selectOption(index);

						e.preventDefault();
						e.stopPropagation();
					}.bind(this),

					removeOption = function(e) {
						log.info('remove host history item: ' + option);

						this.props.source.removeOption(index);

						e.preventDefault();
						e.stopPropagation();
					}.bind(this);

				return (
					React.DOM.li({key: index}, 
						React.DOM.a({href: "#", onClick: selectOption}, option), 
						React.DOM.button({type: "button", className: "btn btn-link btn-sm app-dropdown-btn", title: "Remove from history", onClick: removeOption}, 
							React.DOM.span({className: "glyphicon glyphicon-remove"})
						)
					)
				);
			}.bind(this));
		
			return (
				React.DOM.div({className: "btn-group"}, 
					React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, 
					labels.name, ": ", currentValue, " ", React.DOM.span({className: "caret"})
					), 
					React.DOM.ul({className: "dropdown-menu app-dropdown-with-buttons", role: "menu"}, 
						optionNodes, 
						optionNodes.length > 0 ? React.DOM.li({className: "divider"}) : '', 
						React.DOM.li(null, 
							React.DOM.div({className: "form-group"}, 
								React.DOM.div({className: "input-group input-group-sm"}, 
									React.DOM.input({type: "text", className: "form-control", placeholder: labels.placeholder, value: this.state.text, onChange: this.onTextChange}), 
									React.DOM.span({className: "input-group-btn"}, 
										React.DOM.button({className: "btn btn-default", type: "button", onClick: this.addOption}, "OK")
									)
								)
							)
						)
					)
				)
			);
		}
	});

	return HistoryButton;
});