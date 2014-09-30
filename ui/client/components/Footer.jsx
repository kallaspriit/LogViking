/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger'
], function(React, logger) {
	'use strict';
	
	var log = logger.get('FooterComponent');

	var Footer = React.createClass({
		render: function () {
			log.info('render');
		
			return (
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
			);
		}
	});
	
	return Footer;
});