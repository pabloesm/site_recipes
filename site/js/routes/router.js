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

		'post/:title': 'showPost'
	},

	init: function(){
		$('#post-container').html('');
		new PostCollectionView({el: $("#post-container")});
		console.log('init');
	},

	showAbout: function(){
		console.log('Me!');
	},

	showPost: function(postTitle){
		$(function(){
			// Waiting to load all thing, then clean and show post. Dirty.
			var postView = new PostCollectionOne({
				idReadable: postTitle
			});

			$('#carousel').hide();
		});

	}

});

