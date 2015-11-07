'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore');

Backbone.$ = $;


module.exports = Backbone.View.extend({

	events: {
		'click a': 'toggleActive'
	},

	toggleActive: function(e) {
		$('.active').toggleClass('active');
		$(e.target).toggleClass('active');
	}

});
