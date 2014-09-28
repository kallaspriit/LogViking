/** @jsx React.DOM */
define([
	'React',
	'components/HelloMessage'
], function(React, HelloMessage) {
	'use strict';

	var Application = React.createClass({
		render: function () {
			return <div>
				<div className="navbar navbar-default navbar-fixed-top app-header" role="navigation">
					<div className="container-fluid app-navbar-container">
						<form className="navbar-form navbar-left app-filter-form">
							<div className="btn-group app-type-filter">
								<button type="button" className="btn btn-default app-filter-log">log <sup>2</sup></button>
								<button type="button" className="btn btn-default app-filter-info">info <sup>5</sup></button>
								<button type="button" className="btn btn-default app-filter-warn active">warn</button>
								<button type="button" className="btn btn-default app-filter-error active">error</button>
								<button type="button" className="btn btn-default app-filter-javascript">javascript <sup>22</sup></button>
							</div>
							<button type="button" className="btn btn-link">Clear filter</button>
						</form>
						<form className="navbar-form navbar-right form-inline">
							<div className="form-group">
								<div className="btn-group">
									<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
										Host: localhost <span className="caret"></span>
									</button>
									<ul className="dropdown-menu app-dropdown-with-buttons" role="menu">
										<li>
											<a href="#">localhost longer name blah</a>
											<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
												<span className="glyphicon glyphicon-remove"></span>
											</button>
										</li>
										<li>
											<a href="#">192.168.1.69</a>
											<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
												<span className="glyphicon glyphicon-remove"></span>
											</button>
										</li>
										<li className="divider"></li>
										<li>
											<div className="form-group">
												<div className="input-group input-group-sm">
													<input type="text" className="form-control" placeholder="New host"/>
													<span className="input-group-btn">
														<button className="btn btn-default" type="button">OK</button>
													</span>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
							{' '}
							<div className="form-group">
								<div className="btn-group">
									<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
										Port: 2222 <span className="caret"></span>
									</button>
									<ul className="dropdown-menu app-dropdown-with-buttons" role="menu">
										<li>
											<a href="#">2222</a>
											<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
												<span className="glyphicon glyphicon-remove"></span>
											</button>
										</li>
										<li>
											<a href="#">8080</a>
											<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
												<span className="glyphicon glyphicon-remove"></span>
											</button>
										</li>
										<li className="divider"></li>
										<li>
											<div className="form-group">
												<div className="input-group input-group-sm">
													<input type="text" className="form-control" placeholder="New port"/>
													<span className="input-group-btn">
														<button className="btn btn-default" type="button">OK</button>
													</span>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
							{' '}
							<button type="submit" className="btn btn-primary">Listen</button>
						</form>
					</div>
				</div>

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
											<input type="text" className="form-control" value="5m"/>
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
										<HelloMessage name="Priit" />
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

				<div className="navbar navbar-default navbar-fixed-bottom app-footer" role="navigation">
					<div className="container-fluid app-navbar-container">
						<form className="app-footer-form">
							<div className="row">
								<div className="form-group col-xs-12">
									<div className="app-clearable-input">
										<div className="input-group">
											<input className="form-control" type="text" placeholder="Execute remote JavaScript"/>
											<div className="input-group-btn dropup app-dropdown-with-buttons">
												<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"><span className="caret"></span></button>
												<ul className="dropdown-menu dropdown-menu-right" role="menu">
													<li>
														<a href="#">window.location.href</a>
														<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
															<span className="glyphicon glyphicon-remove"></span>
														</button>
													</li>
													<li>
														<a href="#">player.pause()</a>
														<button type="button" className="btn btn-link btn-sm app-dropdown-btn">
															<span className="glyphicon glyphicon-remove"></span>
														</button>
													</li>
													<li>
														<a href="#">history.back()</a>
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
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>;
		}
	});
	
	return Application;
});