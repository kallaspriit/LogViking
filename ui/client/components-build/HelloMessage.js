/** @jsx React.DOM */
define([
	'React',
	'components/StrongMessage'
], function(React, StrongMessage) {
	'use strict';

	var HelloMessage = React.createClass({displayName: 'HelloMessage',
		getInitialState: function() {
			return {
				seconds: 0
			};
		},

		tick: function() {
			this.setState({
				seconds: this.state.seconds + 1
			});
		},

		componentDidMount: function() {
			this.interval = window.setInterval(this.tick, 1000);
		},

		componentWillUnmount: function() {
			clearInterval(this.interval);
		},

		render: function () {
			return React.DOM.div(null, 
				StrongMessage(null, "Hey ", this.props.name, "!"), 
				React.DOM.p(null, "elapsed: ", this.state.seconds)
			);
		}
	});
	
	return HelloMessage;
});