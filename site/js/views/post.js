'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Handlebars = require('handlebars');

var PostModel = require('../models/post')

Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.model = new PostModel({
			title: 'Mi título',
			body: 'En un lugar de la Mancha...',
			_id: '55fc3a372f083b0702dc4bd1'
		});

		this.model.fetch();

		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		// this.el is what we defined in tagName. use $el to get access
		// to the jQuery html() function

		//this.$el.html(this.template(this.model.attributes));
		var source =$('#postHandleTemp').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.attributes));

		return this;
	}
});