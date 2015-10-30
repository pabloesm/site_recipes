// Entry point for users

'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');

var slick = require('slick-carousel');


Backbone.$ = $;


// var PostView = require('../views/post')
// $(function() {
// 	new PostView({el: $("#post-container")});
// });


var PostCollectionView = require('../views/postCollection')
var Router = require('../routes/router');

$(function() {
	new PostCollectionView({el: $("#post-container")});
	$('.slick-carousel').slick({
		autoplay: true,
		dots: true
	});
});


var router = new Router();
Backbone.history.start();

