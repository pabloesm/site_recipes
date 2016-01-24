// Entry point for admin (add and edit content)

'use strict';

var Backbone = require('backbone');
var	$ = require('jquery');

Backbone.$ = $;

var AdminMainView = require('../views/admin/main');

$(function() {
	new AdminMainView();
});
