'use strict';

var Backbone = require('backbone'),
	$ = require('jquery'),
	_ = require('underscore');

var PostCollection = require('../collections/postCollection'),
	PostCollectionView = require('../views/postCollection'),
	PostCollectionOne = require('../views/postCollectionOne');

module.exports = Backbone.Router.extend({
	routes:  {
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

