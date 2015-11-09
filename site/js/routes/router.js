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

		window.scrollTo(0, 0);
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

		console.log('test point');

	},

	showCategory: function(category){
		$('#carousel').hide();

		new PostCollectionView({
			el: $("#post-container"),
			initType: 'category',
			category: category});
	}

});

