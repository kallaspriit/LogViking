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
				selectOption: React.PropTypes.func.isRequired,
				getHighlight: React.PropTypes.func.isRequired,
				getSelectedIndex: React.PropTypes.func.isRequired
			})
		},

		render: function () {
			log.info('render');

			var highlight = this.props.source.getHighlight(),
				selectedIndex = this.props.source.getSelectedIndex(),
				options = this.props.source.getOptions().map(function(option, index) {
					var optionClass = index === selectedIndex ? 'selected' : '',
						onSelectOption = function() {
							this.props.source.selectOption(index);
						}.bind(this);

					return (
						<li key={index} className={optionClass} onClick={onSelectOption}><em>{highlight}</em><span>{option.replace(highlight, '')}</span></li>
					);
				}.bind(this));
		
			return (
				<ul className="app-selection-popover">
					{options}
				</ul>
			);
		}
	});
	
	return SelectionPopover;
});