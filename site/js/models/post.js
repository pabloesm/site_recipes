'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');

Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		title: 'Default title',
		body: 'Default body'
	}
});

