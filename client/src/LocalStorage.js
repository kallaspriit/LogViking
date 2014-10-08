define([
], function() {
	'use strict';

	/**
	 * Storage.
	 *
	 * @class LocalStorage
	 * @constructor
	 * @module Core
	 * @param {String} [namespace=main] Namespace to use.
	 */
	var LocalStorage = function(namespace) {
		this.namespace = namespace || 'main';
	};

	/**
	 * Event types.
	 *
	 * @event
	 * @param {Object} Event
	 * @param {String} Event.ITEM_ADDED Triggered when a new item is added.
	 * @param {String} Event.ITEM_UPDATED Triggered when an item is updated.
	 * @param {String} Event.ITEM_REMOVED Triggered when an item is removed.
	 * @param {String} Event.CLEARED Triggered when storage is cleared.
	 */
	LocalStorage.Event = LocalStorage.prototype.Event = {
		ITEM_ADDED: 'item-added',
		ITEM_UPDATED: 'item-updated',
		ITEM_REMOVED: 'item-removed',
		CLEARED: 'cleared'
	};

	/**
	 * Initiates the component.
	 *
	 * @method init
	 * @return {LocalStorage} Self
	 */
	LocalStorage.prototype.init = function() {
		return this;
	};

	/**
	 * Stores a value;
	 *
	 * @method store
	 * @param {String} key Key to store under
	 * @param {*} value Value to store
	 * @return {LocalStorage} Self
	 */
	LocalStorage.prototype.store = function(key, value) {
		var serializedData = JSON.stringify(null),
			success = false,
			i;

		if (typeof value === 'string') {
			serializedData = value;
		} else {
			if (Array.isArray(value)) {
				for (i = 0; i < value.length; i++) {
					if (typeof value[i].$$hashKey !== 'undefined') {
						delete value[i].$$hashKey;
					}
				}
			}

			try {
				serializedData = '[<JSON' + JSON.stringify(value);
				success = true;
			} catch (e) {
				throw new Error('Serializing local storage data for "' + key + '" failed', value);
			}
		}

		try {
			window.localStorage.setItem(this.namespace + '.' + key, serializedData);
		} catch (e) {
			throw new Error(
				'Storing local storage data for ' + this.namespace + '.' + key + ' failed (' + e.message + ')'
			);
		}

		return success;
	};

	/**
	 * Fetches a value.
	 *
	 * @method fetch
	 * @param {String} key Key to fetch
	 * @param {*} [missingValue=null] Value to return if item does not exist
	 * @return {LocalStorage} Self
	 */
	LocalStorage.prototype.fetch = function(key, missingValue) {
		var rawData = window.localStorage[this.namespace + '.' + key],
			value = typeof missingValue !== 'undefined' ? missingValue : null;

		if (typeof rawData === 'string') {
			if (rawData.substr(0, 7) === '[<JSON{') {
				try {
					value = JSON.parse(rawData.substr(6));
				} catch (e) {
					throw new Error('Parsing local storage data for "' + key + '" failed', rawData);
				}
			} else {
				value = rawData;
			}
		}

		return value;
	};

	/**
	 * Returns whether the storage has given key.
	 *
	 * @method has
	 * @param {String} key Key to check
	 * @return {Boolean}
	 */
	LocalStorage.prototype.has = function(key) {
		return typeof window.localStorage[this.namespace + '.' + key] !== 'undefined';
	};

	/**
	 * Removes a key from storage.
	 *
	 * @method remove
	 * @param {String} key Key to fetch
	 * @return {Boolean} Was there an item to remove
	 */
	LocalStorage.prototype.remove = function(key) {
		if (typeof(window.localStorage[this.namespace + '.' + key]) === 'undefined') {
			return false;
		}

		window.localStorage.removeItem(this.namespace + '.' + key);

		return true;
	};

	/**
	 * Clears the storage.
	 *
	 * @method clear
	 */
	LocalStorage.prototype.clear = function() {
		window.localStorage.clear();
	};

	/**
	 * Returns the used size of storage.
	 *
	 * @return {Number}
	 */
	LocalStorage.getUsedSize = function() {
		var result = 0,
			i, l,
			key,
			value;

		for (i = 0, l = window.localStorage.length; i < l; i++) {
			key = window.localStorage.key(i);
			value = window.localStorage.getItem(key);

			result += key.length;
			result += value.length;
		}

		return result;
	};

	/**
	 * Returns available storage size.
	 *
	 * @return {Number}
	 */
	LocalStorage.getAvailableSize = function() {
		return 5 * 1024 * 1024;
	};

	/**
	 * Returns available storage size.
	 *
	 * @return {Number}
	 */
	LocalStorage.getUsedPercentage = function(ceil) {
		var value = LocalStorage.getUsedSize() * 100 / LocalStorage.getAvailableSize();

		if (ceil) {
			return Math.ceil(value);
		} else {
			return value;
		}
	};

	return LocalStorage;
});