/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('ContentsComponent');

	var Contents = React.createClass({
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
						<table className="table table-hover app-log-table">
							<tbody>
								<tr className="app-entry-log">
									<td className="app-table-time">5 minutes ago</td>
									<td className="app-table-component">Player</td>
									<td className="app-table-message">
										Test
									</td>
								</tr>
								<tr className="app-entry-info">
									<td>2 minute ago</td>
									<td>Player</td>
									<td>Info example</td>
								</tr>
								<tr className="app-entry-warn">
									<td>1 minute ago</td>
									<td>Player</td>
									<td>Warning example</td>
								</tr>
								<tr className="app-entry-error">
									<td>seconds ago</td>
									<td>Player</td>
									<td>Error example</td>
								</tr>
								<tr className="app-entry-javascript">
									<td>just now</td>
									<td>JavaScript</td>
									<td>JavaScript example.</td>
								</tr>
								<tr className="app-entry-info">
									<td>2 minutes ago</td>
									<td>Player</td>
									<td>Playing http://example.com/movies.m3u8</td>
								</tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>paused</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>opening "http://example.com"</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>playing</td></tr>
								<tr className="app-entry-log"><td>1 minute ago</td><td>Player</td><td>seeking</td></tr>
							</tbody>
						</table>
					</div>
				</div>
			);
		}
	});
	
	return Contents;
});