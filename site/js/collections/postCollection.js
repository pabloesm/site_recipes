'use strict';

import Backbone from 'backbone';
import $ from 'jquery';

//var PostModel = require('../models/post');
import PostModel from '../models/post';

Backbone.$ = $;

var postCollection;

var PostCollection = Backbone.Collection.extend({
	model: PostModel,
	url: 'api/posts'
});


// Singleton pattern
export default function() {
	if (!postCollection) {
		postCollection = new PostCollection();
		console.log('New PostCollection created.');
	}
	return postCollection;
};