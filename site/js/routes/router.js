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
		$('.to-remove').remove();
		$('#post-container').empty();
		var postCollection = new PostCollection();
		postCollection.url = 'api/posts';
		postCollection.fetch({reset: true});
		console.log('init');
		$('#carousel').show();
		window.scrollTo(0, 0);
	},

	showAbout: function(){
		var content = '<div class="to-remove blue"><div class="first"><p id="p1">Work in progress</p><p id="p2">UPS!</p></div></div>';

		console.log('Me!');
		$('#carousel').hide();
		$('#post-container').empty()

		$('#carousel').after(content);
		window.scrollTo(0, 0);
	},

	showPost: function(postTitle){
		$('.to-remove').remove();
		$('footer').hide();
		$('#carousel').hide();

		var url = 'api/posts/' + postTitle;
		var postView = new PostView(url);
	},

	showCategory: function(category){
		$('.to-remove').remove();
		$('#carousel').hide();

		var url = 'api/posts/category/' + category;
		var postCollection = new PostCollection();
		postCollection.url = url;
		postCollection.fetch({reset: true});
		window.scrollTo(0, 0);

	},

	hideElements: function(){
		$('.to-remove').remove();
		$('footer').hide();

	},

	showElements: function(){

	}

});

