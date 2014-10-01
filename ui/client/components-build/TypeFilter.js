/** @jsx React.DOM */
define([
	'jquery',
	'logviking/Logger',
	'React',
	'src/State'
], function($, logger, React, state) {
	'use strict';
	
	var log = logger.get('TypeFilterComponent');

	var TypeFilter = React.createClass({displayName: 'TypeFilter',

		onFilterToggle: function(e) {
			var type = e.currentTarget.dataset.type;

			state.typeFilter[type] = !state.typeFilter[type]

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

			for (filterType in state.typeFilter) {
				if (typeof state.typeFilter[filterType] !== 'boolean') {
					continue;
				}

				filterEnabled = state.typeFilter[filterType];
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