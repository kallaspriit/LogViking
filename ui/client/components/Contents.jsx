/** @jsx React.DOM */
define([
	'React',
	'components/LogContentsTable',
	'logviking/Logger'
], function(React, LogContentsTable, logger) {
	'use strict';
	
	var log = logger.get('ContentsComponent');

	var Contents = React.createClass({

		getInitialState: function() {
			return {
				logEntries: []
			}
		},

		componentDidMount: function() {
			this.props.logEntries.on(
				[this.props.logEntries.Event.ENTRY_ADDED, this.props.logEntries.Event.CLEARED],
				this.validate
			);
		},

		validate: function(entry) {
			this.setState({
				logEntries: this.props.logEntries.getFilteredEntries()
			});
		},

		render: function () {
			log.info('render');
		
			return (
				<div className="container-fluid app-contents">
					<div className="btn-group app-clear-btn">
						<button type="button" className="btn btn-sm btn-default">Clear messages</button>
						<button type="button" className="btn btn-sm btn-default">Reload target</button>
					</div>

					<div className="app-content-header">
						<table className="table table-hover">
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
										<div className="app-clearable-input">
											<div className="input-group">
												<input type="text" className="form-control" placeholder="Filter by component"/>
												<div className="input-group-btn app-dropdown-with-buttons">
													/* check out https://codemirror.net/doc/manual.html#addon_javascript-hint */
													<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"><span className="caret"></span></button>
													<ul className="dropdown-menu dropdown-menu-right" role="menu">
														<li>
															<a href="#">player</a>
															<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
																<span className="glyphicon glyphicon-remove"></span>
															</button>
														</li>
														<li>
															<a href="#">ui</a>
															<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
																<span className="glyphicon glyphicon-remove"></span>
															</button>
														</li>
														<li>
															<a href="#">boostrapper</a>
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
					</div>
					<div className="app-contents-body">
						<LogContentsTable logEntries={this.state.logEntries}/>
					</div>
				</div>
			);
		}
	});
	
	return Contents;
});