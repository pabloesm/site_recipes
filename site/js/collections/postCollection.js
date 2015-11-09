'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');

var PostModel = require('../models/post')

Backbone.$ = $;

var postCollection;

var PostCollection = Backbone.Collection.extend({
	model: PostModel,
	url: 'api/posts'
});


// Singleton pattern
module.exports = function() {
	if (!postCollection) {
		postCollection = new PostCollection();
		console.log('New PostCollection created.');
	}
	return postCollection;
};