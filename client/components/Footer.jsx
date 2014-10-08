/** @jsx React.DOM */
define([
	'React',
	'logviking/Logger',
	'src/State',
	'src/EventHub',
	'src/Server',
	'components/HistoryInput',
	'components/SelectionPopover'
], function(React, logger, state, eventHub, server, HistoryInput, SelectionPopover) {
	'use strict';
	
	var log = logger.get('FooterComponent');

	var Footer = React.createClass({

		getInitialState: function() {
			return {
				autocompleteHints: [],
				autocompleteSelectedIndex: 0
			}
		},

		componentDidMount: function() {
			eventHub.on([eventHub.Intent.UPDATE_JAVASCRIPT_AUTOCOMPLETE, eventHub.Change.SERVER], function() {
				this.forceUpdate();
			}.bind(this));

			eventHub.on(eventHub.Change.JAVASCRIPT_AUTOCOMPLETE_HINTS_UPDATED, function(hints) {
				this.setState({
					autocompleteHints: hints,
					autocompleteSelectedIndex: Math.min(
						Math.max(this.state.autocompleteSelectedIndex, 0),
						hints.length - 1
					)
				});
			}.bind(this));
		},

		componentDidUpdate: function() {
			var $autocompletePopover = $(this.refs.autocompletePopover.getDOMNode()),
				autocompletePopoverPosition = state.executeJavascript.value.length * 7 + 20;

			$autocompletePopover.css('left', autocompletePopoverPosition + 'px');
		},

		getPartialAutocompleteValue: function() {
			var value = state.executeJavascript.value,
				lastDotPos = value.lastIndexOf('.');

			if (lastDotPos === -1) {
				return value;
			} else {
				return value.substr(lastDotPos + 1);
			}
		},

		getBaseAutocompleteValue: function() {
			var value = state.executeJavascript.value,
				lastDotPos = value.lastIndexOf('.');

			if (lastDotPos === -1) {
				return '';
			} else {
				return value.substr(0, lastDotPos) + '.';
			}
		},

		onJavascriptExecuteSubmit: function(event) {
			var value = state.executeJavascript.value;

			log.info('executing javascript: ' + value);

			eventHub.emit(eventHub.Intent.EXECUTE_REMOTE_JAVASCRIPT, value);

			event.preventDefault();
		},

		render: function () {
			log.info('render');

			var hasInspected = server.getRpcInterface().hasInspected(),
				executeJavascriptSource = {
					getLabels: function() {
						return {
							placeholder: 'Execute remote JavaScript',
							clear: 'clear history'
						};
					}.bind(this),

					getValue: function() {
						return state.executeJavascript.value;
					}.bind(this),

					onValueChange: function(newValue) {
						state.executeJavascript.value = newValue;
					}.bind(this),

					onValueBlur: function(value) {
						var alreadyExists = state.executeJavascript.history.indexOf(value) !== -1;

						if (!alreadyExists && value.length > 0) {
							state.executeJavascript.history.push(value);
						}

						if (state.executeJavascript.history.length > 5) {
							state.executeJavascript.history.shift();
						}
					}.bind(this),

					getOptions: function() {
						return state.executeJavascript.history;
					}.bind(this),

					selectOption: function(index) {
						log.info('select: "' + state.executeJavascript.history[index] + '"');

						state.executeJavascript.value = state.executeJavascript.history[index];
					}.bind(this),

					removeOption: function(index) {
						log.info('remove: "' + state.executeJavascript.history[index] + '"');

						state.executeJavascript.history.splice(index, 1);
					}.bind(this),

					clearOptions: function() {
						log.info('clear options for ' + filterType);

						state.executeJavascript.history = [];
					}.bind(this),

					getSettings: function() {
						return {
							dropdownAlign: 'right',
							dropup: true,
							className: 'app-autocomplete-wrap',
							isDisabled: !hasInspected
						}
					}.bind(this),

					onKeyDown: function(event) {
						switch (event.keyCode) {
							case 38: // up
								this.state.autocompleteSelectedIndex--;
							break;

							case 40: // down
								this.state.autocompleteSelectedIndex++;
							break;

							case 9: // tab
								if (typeof this.state.autocompleteHints[this.state.autocompleteSelectedIndex] === 'undefined') {
									event.preventDefault();

									return;
								}

								state.executeJavascript.value = this.getBaseAutocompleteValue() +
									this.state.autocompleteHints[this.state.autocompleteSelectedIndex];
							break;

							default:
								return;
							break;
						}

						this.setState({
							autocompleteSelectedIndex: Math.min(
								Math.max(this.state.autocompleteSelectedIndex, 0),
								this.state.autocompleteHints.length - 1
							)
						});

						log.info('handled key event: ' + event.keyCode);

						event.preventDefault();
					}.bind(this)
				},
				autocompleteSource = {
					getOptions: function() {
						return this.state.autocompleteHints
					}.bind(this),

					selectOption: function(index) {
						if (typeof this.state.autocompleteHints[index] === 'undefined') {
							return;
						}

						log.info('select: "' + this.state.autocompleteHints[index] + '"');

						state.executeJavascript.value = this.getBaseAutocompleteValue() +
							this.state.autocompleteHints[index];

						$(this.refs.executeJavascript.getDOMNode()).find('INPUT:first').focus();

						this.forceUpdate();
					}.bind(this),

					getHighlight: function() {
						return this.getPartialAutocompleteValue();
					}.bind(this),

					getSelectedIndex: function() {
						return this.state.autocompleteSelectedIndex;
					}.bind(this)
				};
		
			return (
				<div className="navbar navbar-default navbar-fixed-bottom app-footer" role="navigation">
					<div className="container-fluid app-navbar-container">
						<form className="app-footer-form" onSubmit={this.onJavascriptExecuteSubmit}>
							<div className="row">
								<div className="form-group col-xs-12">
									<HistoryInput ref="executeJavascript" source={executeJavascriptSource}/>
									<SelectionPopover ref="autocompletePopover" source={autocompleteSource}/>
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