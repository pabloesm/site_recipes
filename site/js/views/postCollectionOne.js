'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Handlebars = require('handlebars');

Backbone.$ = $;

var PostModel = require('../models/post'),
	PostCollection = require('../collections/postCollection');

module.exports = Backbone.View.extend({
	el: '#post-container',

	initialize: function(data) {
		// Dirty solution! We should fecth only the post of interest
		// instead of a complete collection
		this.collection = new PostCollection(data);
		this.collection.fetch({reset: true});

		this.data = data;

		this.listenTo(this.collection, 'reset', this.renderOne);
	},

	renderOne: function() {
		this.model = this.collection.findWhere(this.data);

		var source =$('#postTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.attributes));

		return this;
	}
});