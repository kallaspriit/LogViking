/** @jsx React.DOM */
define([
	'React'
], function(React) {
	'use strict';

	var StrongMessage = React.createClass({displayName: 'StrongMessage',
		render: function () {
			return React.DOM.strong(null, this.props.children);
		}
	});
	
	return StrongMessage;
});