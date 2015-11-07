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


var PostCollectionView = require('../views/postCollection');
var Router = require('../routes/router');

var MenuView = require('../views/menuView');

$(function() {
	new PostCollectionView({el: $('#post-container')});

	new MenuView({el: $('.navbar')});

	$('.slick-carousel').slick({
		autoplay: false,
		dots: true
	});

});


var router = new Router();
Backbone.history.start();

