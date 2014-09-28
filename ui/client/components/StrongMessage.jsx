/** @jsx React.DOM */
define([
	'React'
], function(React) {
	'use strict';

	var StrongMessage = React.createClass({
		render: function () {
			return <strong>{this.props.children}</strong>;
		}
	});
	
	return StrongMessage;
});