/** @jsx React.DOM */
define([
	'jquery',
	'React',
	'logviking/Logger'
], function($, React, logger) {
	'use strict';
	
	var log = logger.get('TypeFilterComponent');

	var TypeFilter = React.createClass({displayName: 'TypeFilter',

		propTypes: {
			filters: React.PropTypes.shape({
				log: React.PropTypes.bool.isRequired,
				info: React.PropTypes.bool.isRequired,
				warn: React.PropTypes.bool.isRequired,
				error: React.PropTypes.bool.isRequired,
				javascript: React.PropTypes.bool.isRequired
			}).isRequired
		},

		onFilterToggle: function(e) {
			var type = e.currentTarget.dataset.type;

			this.props.filters[type] = !this.props.filters[type]

			$(e.currentTarget).blur();

			this.forceUpdate();
		},

		render: function () {
			log.info('render');

			var baseClasses = ['btn', 'btn-default'],
				buttons = [],
				btnClasses,
				filterType,
				filterEnabled;

			for (filterType in this.props.filters) {
				if (typeof this.props.filters[filterType] !== 'boolean') {
					continue;
				}

				filterEnabled = this.props.filters[filterType];
				btnClasses = baseClasses.concat('app-filter-' + filterType);

				if (filterEnabled) {
					btnClasses.push('active');
				}

				// TODO add <sup>2</sup> etc
				buttons.push(
					React.DOM.button({key: filterType, type: "button", className: btnClasses.join(' '), 'data-type': filterType, onClick: this.onFilterToggle}, filterType)
				);
			}
		
			return (
				React.DOM.form({className: "navbar-form navbar-left app-filter-form"}, 
					React.DOM.div({className: "btn-group app-type-filter"}, 
					buttons
					), 
					React.DOM.button({type: "button", className: "btn btn-link"}, "Clear filter")
				)
			);
		}
	});
	
	return TypeFilter;
});