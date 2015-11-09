'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Handlebars = require('handlebars');

Backbone.$ = $;

var PostCollection = require('../collections/postCollection');
var PostPreview = require('../views/postPreview'); // The path is redundant, we are in /views

module.exports = Backbone.View.extend({

	initialize: function() {
		this.collection = new PostCollection();
		this.collection.fetch({reset: true});

		//	this.render();

		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function(){
		$('#post-container').html('');
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






