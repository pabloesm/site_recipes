// Entry point for admin (add and edit content)

'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');

Backbone.$ = $;


var EditView = require('../views/edit')


$(function() {
	new EditView();
});