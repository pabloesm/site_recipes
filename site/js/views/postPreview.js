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
		var previewAttrs = $.extend({}, this.model.attributes),
			plainBody = $(previewAttrs.body).text(),
			TRIM_LENGTH = 117,
			trimmedBody = this.trimString(plainBody, TRIM_LENGTH);

		previewAttrs.body = '<p>' + trimmedBody + '</p>';

		var source =$('#postPreviewTemplate').html();
		var	template = Handlebars.compile(source);

		this.$el.html(template(previewAttrs));

		return this;
	},

	goToPost: function() {
		var idReadable = this.model.get('idReadable');
		var url = "#post/" + idReadable;
		window.location.href = url;
	},

	trimString: function(s, length) {
		/* Trims a given string to the maximum length without truncate any word*/
		var words = s.split(' ');
		var trimmedStr = words[0]
		for (var i = 1; i < words.length; i++) {
			trimmedStr += ' ' + words[i]

			if (words[i+1]) {
				var n = trimmedStr + ' ' + words[i+1]
				if (n.length > (length - 3)) {
					return trimmedStr + '...';
				}
			}

		}
		return trimmedStr;
	}

});