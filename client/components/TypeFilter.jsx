/** @jsx React.DOM */
define([
	'jquery',
	'logviking/Logger',
	'React',
	'src/State',
	'src/EventHub'
], function($, logger, React, state, eventHub) {
	'use strict';
	
	var log = logger.get('TypeFilterComponent');

	var TypeFilter = React.createClass({

		onFilterToggle: function(e) {
			var type = e.currentTarget.dataset.type;

			state.typeFilter[type] = !state.typeFilter[type]

			$(e.currentTarget).blur();
		},

		componentDidMount: function() {
			eventHub.on(eventHub.Change.TYPE_FILTER, function() {
				this.forceUpdate();
			}.bind(this));
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
					<button key={filterType} type="button" className={btnClasses.join(' ')} data-type={filterType} onClick={this.onFilterToggle}>{filterType}</button>
				);
			}
		
			return (
				<form className="navbar-form navbar-left app-filter-form">
					<div className="btn-group app-type-filter">
					{buttons}
					</div>
					<button type="button" className="btn btn-link">Clear filter</button>
				</form>
			);
		}
	});
	
	return TypeFilter;
});