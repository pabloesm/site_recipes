'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore'),
	Handlebars = require('handlebars');

Backbone.$ = $;

var PostModel = require('../models/post');

module.exports = Backbone.View.extend({
	tagName: 'div',

	className: 'preview',

	events: {
		'click .post-photomain': 'goToPost',
		'click .post-title': 'goToPost'
	},

	render: function() {
		var source =$('#postPreviewTemplate').html();
		var template = Handlebars.compile(source);
		this.$el.html(template(this.model.attributes));

		return this;
	},

	goToPost: function() {
		var idReadable = this.model.get('idReadable');
		var url = "#post/" + idReadable;
		window.location.href = url;
	}

});