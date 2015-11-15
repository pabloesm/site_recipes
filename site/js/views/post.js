'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Handlebars = require('handlebars');

Backbone.$ = $;

var PostModel = require('../models/post');

module.exports = Backbone.View.extend({
	el: '#post-container',

	initialize: function(url) {
		this.model = new PostModel();

		this.model.fetch({url: url});

		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		// this.el is what we defined in tagName. use $el to get access
		// to the jQuery html() function

		//this.$el.html(this.template(this.model.attributes));
		var source = $('#postTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.attributes));

		window.scrollTo(0, 0);
		$('footer').show();

		return this;
	}
});