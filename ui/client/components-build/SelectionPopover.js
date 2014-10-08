/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('SelectionPopoverComponent');

	var SelectionPopover = React.createClass({displayName: 'SelectionPopover',

		propTypes: {
			source: React.PropTypes.shape({
				getOptions: React.PropTypes.func.isRequired
			})
		},

		render: function () {
			log.info('render');

			var highlight = this.props.source.getHighlight(),
				selectedIndex = this.props.source.getSelectedIndex(),
				options = this.props.source.getOptions().map(function(option, index) {
					var optionClass = index === selectedIndex ? 'selected' : '';

					return (
						React.DOM.li({key: index, className: optionClass}, React.DOM.em(null, highlight), React.DOM.span(null, option.replace(highlight, '')))
					);
				});
		
			return (
				React.DOM.ul({className: "app-selection-popover"}, 
					options
				)
			);
		}
	});
	
	return SelectionPopover;
});