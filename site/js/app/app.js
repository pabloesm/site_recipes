// Entry point for users

'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');

Backbone.$ = $;


var PostView = require('../views/post')

// var ModelPost = require('./models/post.js'),
// 	ViewPost = require('.views/post.js');

$(function() {
	new PostView({el: $("#postContainer")});
});