'use strict';

var Backbone = require('backbone');
var $ = require('jquery');
var	_ = require('underscore');
var	slug = require('slug'); // String processing

var AddView = require('./add');
var EditView = require('./edit');
var RemoveView = require('./remove');

var PostCollection = require('../../collections/postCollection');

Backbone.$ = $;

module.exports = Backbone.View.extend({
	el: '#main',

	events:{
		'click #addPost': 'addPost',
		'click #editPost': 'editPost',
		'click #removePost': 'removePost',
	},

	initialize: function() {
		console.log('Admin view initialized.');
	},

	addPost: function() {
		console.log('addPost()');
		new AddView();
	},

	editPost: function() {
		console.log('editPost()');
		var postCollection = PostCollection();
		new EditView({
			collection: postCollection,
		});
	},

	removePost: function() {
		console.log('removePost()');
		new RemoveView();
	},
});

