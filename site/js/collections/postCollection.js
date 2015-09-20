'use strict';

var Backbone = require('backbone'),
	$ = require('jquery');

var PostModel = require('../models/post')

Backbone.$ = $;

module.exports = Backbone.Collection.extend({
	model: PostModel
});