'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Handlebars = require('handlebars');

Backbone.$ = $;

var PostPreview = require('../views/postPreview'); // The path is redundant, we are in /views


var postCollection;

var PostCollection = Backbone.View.extend({

	initialize: function() {
		this.collection.fetch({reset: true});

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
module.exports = function(options) {
	if (!postCollection) postCollection = new PostCollection(options);
	return postCollection;
};






