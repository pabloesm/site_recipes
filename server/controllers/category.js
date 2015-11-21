'use strict';

var utils = require('../lib/utils');
var bodyMarked = utils.bodyMarked;

var PostModel = require('../models/post');

exports.nothing2seeHere = function(req, res) {
	res.status(200).send('Nothing to see here. You must specify some category!');
};

exports.findByCategory = function(req, res) {
	// Return all posts in a category
	var category = req.params.id;
	return PostModel.find({postType: category}, function(err, posts) {
		if (!err) {
			console.log('Sending posts by category ' + req.params.id + ' returned by findByCategory().');
			posts = bodyMarked(posts);
			return res.send(posts);
		} else {
			return console.log(err);
		}
	});
};
