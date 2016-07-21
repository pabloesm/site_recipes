'use strict';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import slug from 'slug'; // String processing

import AddView from './add';
import EditView from './edit';
import RemoveView from './remove';

import PostCollection from '../../collections/postCollection';

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
		var postCollection = PostCollection();
		new RemoveView({
			collection: postCollection,
		});
	},
});

