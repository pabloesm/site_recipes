'use strict';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import PostCollection from '../collections/postCollection';
import PostCollectionView from '../views/postCollection';
import PostView from '../views/post';
//var PostCollection = require('../collections/postCollection');
//var	PostCollectionView = require('../views/postCollection');
//var	PostView = require('../views/post');

export default Backbone.Router.extend({
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

	showAbout: function() {
		var content = '<div class="to-remove blue"><div class="first"><p id="p1">Work in progress</p><p id="p2">UPS!</p></div></div>';

		console.log('Me!');
		$('#carousel').hide();
		$('#post-container').empty();

		$('#carousel').after(content);
		window.scrollTo(0, 0);
	},

	showPost: function(postTitle) {
		this.hideElements();
		$('#carousel').hide();

		var url = 'api/posts/' + postTitle;
		var postView = new PostView(url);

		this.showElements();
	},

	showCategory: function(category) {
		$('.to-remove').remove();
		$('#carousel').hide();

		var url = 'api/category/' + category;
		var postCollection = new PostCollection();
		postCollection.url = url;
		postCollection.fetch({reset: true});
		window.scrollTo(0, 0);

	},

	hideElements: function() {
		$('.to-remove').remove();
		$('footer').hide();

	},

	showElements: function() {
		$('footer').show();
		window.scrollTo(0, 0);
	},
});

