'use strict';

var mkdirp = require('mkdirp'); // Like mkdir -p, but in node.js

var PostModel = require('../models/post');
var utils = require('../lib/utils');

var relocate = utils.relocate;
var bodyMarked = utils.bodyMarked;
var liststr2array = utils.liststr2array;
var listnum2array = utils.listnum2array;
var arrayOfObjects = utils.arrayOfObjects;
var typeOfID = utils.typeOfID;

exports.findAll = function(req, res) {
	// Return all posts
	return PostModel.find(function(err, posts) {
		if (!err) {
			console.log('Sending posts array returned by findAll().');
			posts = bodyMarked(posts);
			return res.send(posts);
		} else {
			return console.log(err);
		}
	});
};

exports.findById = function(req, res) {
	/* Allows searching by different types of :id
  	 typeOfID() parses the :id
  */
	if (typeOfID(req.params.id) === '_id') {
		return PostModel.findById(req.params.id, function(err, post) {
			if (!err) {
				post = bodyMarked(post);
				return res.send(post);
			} else {
				return console.log(err);
			}
		});

	} else {
		return PostModel.findOne({idReadable: req.params.id}, function(err, post) {
			if (!err) {
				post = bodyMarked(post);
				return res.send(post);
			} else {
				return console.log(err);
			}
		});
	}
};

exports.add = function(req, res) {
	console.log(req.headers);

	var date = new Date();
	var year = date.getFullYear();
	var currentTime = date.getTime();

	var photoPath = 'data/img/' + year + '/' + req.body.idReadable;
	var keys = liststr2array(req.body.keywords);
	var coordinates = listnum2array(req.body.coordinates);

	var urls = photoUrl(req.files, photoPath);
	console.log(urls);

	var post = new PostModel({
		title: req.body.title,
		body: req.body.body,
		idReadable: req.body.idReadable,
		photoMain: urls.photoMain,
		photoOthers: arrayOfObjects(urls.photoOthers, 'photo'),
		keywords: arrayOfObjects(keys, 'keyword'),
		date: currentTime,
		postType: req.body.postType,
		address: req.body.address,
		phone: req.body.phone,
		url: req.body.url,
		coordinates: arrayOfObjects(coordinates, 'coordinate'),
	});

	mkdirp(photoPath, function(err) {
		if (err) {
			console.error(err);
		} else {
			console.log('Directory ' + req.body.idReadable + ' created.');
			relocate(req.files.photoMain, photoPath);
			if (req.files.photoOthers !== undefined) {
				relocate(req.files.photoOthers, photoPath);
			}
		}
	});

	return post.save(function(err) {
		if (!err) {
			console.log('Post "' + req.body.title + '" saved');
			return res.send(post);
		} else {
			console.log(err);
		}
	});

};

