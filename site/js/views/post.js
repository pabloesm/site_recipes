'use strict';

var Backbone = require('backbone');
var	$ = require('jquery');
var	_ = require('underscore');
var	Handlebars = require('handlebars');

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

		var source = $('#postTemplate').html();
		var template = Handlebars.compile(source);
		var templateData = this.model.attributes;
		templateData.hasContactInfo = templateData.address !== undefined ? true : false;
		this.$el.html(template(templateData));

		return this;
	},
});
