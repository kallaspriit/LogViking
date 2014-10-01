/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('HistoryInputComponent');

	var HistoryInput = React.createClass({displayName: 'HistoryInput',

		propTypes: {
			source: React.PropTypes.shape({
				getLabels: React.PropTypes.func.isRequired,
				getValue: React.PropTypes.func.isRequired,
				onValueChange: React.PropTypes.func.isRequired,
				getOptions: React.PropTypes.func.isRequired,
				selectOption: React.PropTypes.func.isRequired,
				removeOption: React.PropTypes.func.isRequired,
				clearOptions: React.PropTypes.func
			})
		},

		onValueChange: function(e) {
			var value = e.target.value;

			this.props.source.onValueChange(value);

			this.forceUpdate();
		},

		render: function () {
			log.info('render');

			var value = this.props.source.getValue(),
				options = this.props.source.getOptions(),
				labels = this.props.source.getLabels(),
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
				React.DOM.div({className: "app-clearable-input"}, 
					React.DOM.div({className: "input-group"}, 
						React.DOM.input({type: "text", className: "form-control", placeholder: labels.placeholder, value: value, onChange: this.onValueChange}), 
						React.DOM.div({className: "input-group-btn app-dropdown-with-buttons"}, 
							"/* check out https://codemirror.net/doc/manual.html#addon_javascript-hint */", 
							React.DOM.button({type: "button", className: "btn btn-default dropdown-toggle", 'data-toggle': "dropdown"}, React.DOM.span({className: "caret"})), 
							React.DOM.ul({className: "dropdown-menu dropdown-menu-right", role: "menu"}, 
								optionNodes, 
								optionNodes.length > 0 ? React.DOM.li({className: "divider"}) : '', 
								React.DOM.li(null, React.DOM.a({href: "#"}, "clear history"))
							)
						)
					), 
					React.DOM.a({className: "btn app-clear-command-btn", href: "#"}, React.DOM.i({className: "glyphicon glyphicon-remove-circle"}))
				)
			);
		}
	});
	
	return HistoryInput;
});