'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore');

var PostModel = require('../models/post')

Backbone.$ = $;

module.exports = Backbone.View.extend({
	template: _.template($('#postTemplate').html()),

	initialize: function() {
		this.model = new PostModel({
			title: 'Mi título',
			body: 'En un lugar de la Mancha...'
		});

		this.render();
	},

	render: function() {
		// this.el is what we defined in tagName. use $el to get access
		// to the jQuery html() function
		this.$el.html(this.template(this.model.attributes));

		return this;
	}
});