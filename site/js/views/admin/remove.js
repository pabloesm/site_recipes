'use strict';

var Backbone = require('backbone');
var	$ = require('jquery');
var	_ = require('underscore');
var Handlebars = require('handlebars');

Backbone.$ = $;

module.exports = Backbone.View.extend({
	el: '#content',

	initialize: function(){
		console.log('Remove view initialized.');
		this.render();
	},

	render: function() {
		this.$el.html('Remove view!');
	}
});

