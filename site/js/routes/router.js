'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore');

var PostCollection = require('../collections/postCollection'),
	PostCollectionView = require('../views/postCollection'),
	PostView = require('../views/post');

module.exports = Backbone.Router.extend({
	routes:  {
		'': 'init',

		'main': 'init',

		'about': 'showAbout',

		'post/:title': 'showPost',

		'posts/:category': 'showCategory'
	},

	init: function(){
		$('#post-container').empty();
		var postCollection = new PostCollection();
		postCollection.url = 'api/posts';
		postCollection.fetch({reset: true});
		console.log('init');
		$('#carousel').show();
		window.scrollTo(0, 0);
	},

	showAbout: function(){
		console.log('Me!');
	},

	showPost: function(postTitle){
		$('footer').hide();
		$('#carousel').hide();

		var url = 'api/posts/' + postTitle;
		var postView = new PostView(url);
	},

	showCategory: function(category){
		$('#carousel').hide();

		var url = 'api/posts/category/' + category;
		var postCollection = new PostCollection();
		postCollection.url = url;
		postCollection.fetch({reset: true});
		window.scrollTo(0, 0);


		// new PostCollectionView({
		// 	el: $("#post-container"),
		// 	initType: 'category',
		// 	category: category});
	}

});

