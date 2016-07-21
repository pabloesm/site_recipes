'use strict';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Handlebars from 'handlebars';

Backbone.$ = $;

import PostModel from '../models/post';
//var PostModel = require('../models/post');

export default Backbone.View.extend({
	el: '#post-container',

	initialize: function(url) {
		this.model = new PostModel();

		this.model.fetch({url: url});

		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		// this.el is what we defined in tagName. use $el to get access
		// to the jQuery html() function

		var source = $('#postTemplateNew').html();
		var template = Handlebars.compile(source);
		var templateData = this.model.attributes;
		templateData.hasContactInfo = templateData.address !== undefined ? true : false;
		this.$el.html(template(templateData));

		return this;
	},
});
