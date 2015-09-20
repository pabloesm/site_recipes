'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');

Backbone.$ = $;

module.exports = Backbone.Model.extend({
	urlRoot: '/api/posts',

	idAttribute: '_id',

	defaults: {
		title: 'Default title',
		body: 'Default body',
		keywords: 'Default keyword'
	}

});

