'use strict';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Handlebars from 'handlebars';

Backbone.$ = $;

//var PostPreview = require('../views/postPreview'); // The path is redundant, we are in /views
import PostPreview from '../views/postPreview'; // The path is redundant, we are in /views
var postCollection; // Used in the singleton pattern



var PostCollection = Backbone.View.extend({

	initialize: function() {
		//this.collection.fetch({reset: true});
		//this.render();

		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function(){
		$('#post-container').empty();
		console.log('Collection reset fires render view.')
		this.collection.each(function(item){
			this.renderPostPreview(item);
		}, this);
	},

	renderPostPreview: function(item) {
		var postPreview = new PostPreview({
			model: item
		});

		$('#post-container').append(postPreview.render().el);

		return this;
	}

});

// Singleton pattern
export default function(options) {
	if (!postCollection) postCollection = new PostCollection(options);
	return postCollection;
};






