define([
	'src/EventEmitter',
	'logviking/Logger',
	'src/Platform',
	'jquery',
	'bootstrap',

], function(EventEmitter, logger, platform, $) {
	'use strict';
	
	var log = logger.get('UserInterface');

	var UserInterface = function() {
		EventEmitter.call(this);
	};

	UserInterface.prototype = Object.create(EventEmitter.prototype);

	UserInterface.Event = {
		RELOADING: 'reloading'
	};

	UserInterface.KeyCode = {
		F5: 116,
		F12: 123
	};

	UserInterface.prototype.init = function() {
		log.info('init');

		this._setupKeyListeners();
	};

	UserInterface.prototype.showDevTools = function() {
		log.info('showing developer tools');

		if (platform.isNodeEnv()) {
			require('nw.gui').Window.get().showDevTools();

			return false;
		} else {
			return true;
		}
	};

	UserInterface.prototype.reload = function() {
		var timeout = 500;

		log.info('reloading in ' + timeout + 'ms');

		this.emit(UserInterface.Event.RELOADING);

		window.setTimeout(function() {
			window.location.reload();
		}, timeout);
	};

	UserInterface.prototype._setupKeyListeners = function() {
		log.info('setting up key listener');

		$(window).keydown(function(e) {
			var result = this._onKeyDown(e) === false ? false : true;

			if (result === false) {
				log.info('preventing key propagation: ' + e.keyCode);

				e.preventDefault();
			}

			return result;
		}.bind(this));
	};

	UserInterface.prototype._onKeyDown = function(e) {
		log.info('key down: ' + e.keyCode);

		switch (e.keyCode) {
			case UserInterface.KeyCode.F5:
				this.reload();

				return false;

			case UserInterface.KeyCode.F12:
				return this.showDevTools();
		}

		return true;
	};

    return UserInterface;
});