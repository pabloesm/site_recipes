'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore');

var PostCollectionView = require('../views/postCollection'),
	PostCollectionOne = require('../views/postCollectionOne');

module.exports = Backbone.Router.extend({
	routes:  {
		'main': 'init',

		'about': 'showAbout',

		'post/:title': 'showPost',

		'posts/:category': 'showCategory'
	},

	init: function(){
		$('#post-container').html('');
		new PostCollectionView({el: $("#post-container")});
		console.log('init');

		$('#carousel').show();
	},

	showAbout: function(){
		console.log('Me!');
	},

	showPost: function(postTitle){
		$('#post-container').html('');
		$('footer').hide();
		$('#carousel').hide();

		var postView = new PostCollectionOne({
				idReadable: postTitle
			});

	},

	showCategory: function(category){
		$('#post-container').html('');
	}

});

