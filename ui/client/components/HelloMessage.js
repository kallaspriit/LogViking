/** @jsx React.DOM */
define([
	'React',
	'components/StrongMessage'
], function(React, StrongMessage) {
	'use strict';

	var HelloMessage = React.createClass({
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
			return <div>
				<StrongMessage>Hello {this.props.name}!</StrongMessage>
				<p>elapsed: {this.state.seconds}</p>
			</div>;
		}
	});
	
	return HelloMessage;
});