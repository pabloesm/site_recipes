'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');

Backbone.$ = $;

module.exports = Backbone.Model.extend({
	idAttribute: '_id',

	// urlRoot : 'api/posts/expressjs',

	defaults: {
		title: 'Default title',
		body: 'Default body',
		keywords: 'Default keyword'
	}

});

