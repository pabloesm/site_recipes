// Entry point for users

'use strict';

import Backbone from 'backbone';
import $ from 'jquery';

import slick from 'slick-carousel';

Backbone.$ = $;


// var PostView = require('../views/post')
// $(function() {
// 	new PostView({el: $("#post-container")});
// });

import PostCollection from '../collections/postCollection';
import PostCollectionView from '../views/postCollection';
import Router from '../routes/router';
import MenuView from '../views/menuView';

$(function() {

	new MenuView({el: $('.navbar')});

	$('.slick-carousel')
	.on('init', function(){
		console.log('carousel init');
		$('#carousel').css('visibility', 'visible');
	})
	.slick({
		autoplay: true,
		dots: true
	});

	var postCollection = PostCollection();
	PostCollectionView({
		collection: postCollection,
		el: $('#post-container')
	});

});


var router = new Router();
Backbone.history.start();

