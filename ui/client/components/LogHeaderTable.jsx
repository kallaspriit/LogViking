/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/State',
	'components/HistoryInput'
], function(React, logger, state, HistoryInput) {
	'use strict';
	
	var log = logger.get('LogHeaderTableComponent');

	var LogHeaderTable = React.createClass({
		render: function () {
			log.info('render');

			var filterType,
				filterSources = {};

			for (filterType in state.contentFilter) {
				if (filterType.substr(0, 1) === '_' || typeof state.contentFilter[filterType] === 'function') {
					continue;
				}

				filterSources[filterType] = {
					getLabels: function() {
						return {
							placeholder: 'Filter by component',
							clear: 'clear history'
						};
					}.bind(this),

					getValue: function(filterType) {
						return state.contentFilter[filterType].value;
					}.bind(this, filterType),

					onValueChange: function(filterType, newValue) {
						state.contentFilter[filterType].value = newValue;
					}.bind(this, filterType),

					onValueBlur: function(filterType, value) {
						var alreadyExists = state.contentFilter[filterType].history.indexOf(value) !== -1;

						if (!alreadyExists && value.length > 0) {
							state.contentFilter[filterType].history.push(value);
						}

						if (state.contentFilter[filterType].history.length > 5) {
							state.contentFilter[filterType].history.shift();
						}
					}.bind(this, filterType),

					getOptions: function(filterType) {
						return state.contentFilter[filterType].history;
					}.bind(this, filterType),

					selectOption: function(filterType, index) {
						log.info('select ' + filterType + ': "' + state.contentFilter[filterType].history[index] + '"');

						state.contentFilter[filterType].value = state.contentFilter[filterType].history[index];
					}.bind(this, filterType),

					removeOption: function(filterType, index) {
						log.info('remove ' + filterType + ': "' + state.contentFilter[filterType].history[index] + '"');

						state.contentFilter[filterType].history.splice(index, 1);
					}.bind(this, filterType),

					clearOptions: function(filterType, index) {
						log.info('clear options for ' + filterType);

						state.contentFilter[filterType].history = [];
					}.bind(this, filterType)
				}
			}
		
			return (
				<table id="log-table-header" className="table table-hover">
					<thead>
						<tr>
							<th className="app-table-time">Time</th>
							<th className="app-table-component">Component</th>
							<th className="app-table-message">Message</th>
						</tr>
						<tr>
							<td>
								<div className="input-group">
									<input type="text" className="form-control" defaultValue="5m"/>
									<div className="input-group-btn">
										<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"><span className="caret"></span></button>
										<ul className="dropdown-menu dropdown-menu-right" role="menu">
											<li><a href="#">60 seconds</a></li>
											<li><a href="#">2 minutes</a></li>
											<li><a href="#">10 minutes</a></li>
											<li><a href="#">all</a></li>
										</ul>
									</div>
								</div>
							</td>
							<td>
								<HistoryInput source={filterSources.component}/>
							</td>
							<td>
								<div className="app-clearable-input">
									<div className="input-group">
										<input type="text" className="form-control" placeholder="Filter by message"/>
										<div className="input-group-btn app-dropdown-with-buttons">
											<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"><span className="caret"></span></button>
											<ul className="dropdown-menu dropdown-menu-right" role="menu">
												<li>
													<a href="#">player</a>
													<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
														<span className="glyphicon glyphicon-remove"></span>
													</button>
												</li>
												<li>
													<a href="#">play</a>
													<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
														<span className="glyphicon glyphicon-remove"></span>
													</button>
												</li>
												<li>
													<a href="#">pause|stop</a>
													<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
														<span className="glyphicon glyphicon-remove"></span>
													</button>
												</li>
												<li className="divider"></li>
												<li><a href="#">clear history</a></li>
											</ul>
										</div>
									</div>
									<a className="btn app-clear-command-btn" href="#"><i className="glyphicon glyphicon-remove-circle"></i></a>
								</div>
							</td>
						</tr>
					</thead>
				</table>
			);
		}
	});
	
	return LogHeaderTable;
});