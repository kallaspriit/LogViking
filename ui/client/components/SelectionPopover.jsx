/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('SelectionPopoverComponent');

	var SelectionPopover = React.createClass({

		propTypes: {
			source: React.PropTypes.shape({
				getOptions: React.PropTypes.func.isRequired,
			})
		},

		render: function () {
			log.info('render');

			var highlight = this.props.source.getHighlight(),
				options = this.props.source.getOptions().map(function(option, key) {
					return (
						<li key={key}><em>{highlight}</em><span>{option.replace(highlight, '')}</span></li>
					);
				});
		
			return (
				<ul className="app-selection-popover">
					{options}
				</ul>
			);
		}
	});
	
	return SelectionPopover;
});