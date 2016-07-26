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
var photoUrl = utils.photoUrl;
var removeData = utils.removeData;
var imageManagement = utils.imageManagement;
var parseImageRoutes = utils.parseImageRoutes;

var marked = require('marked'); // Markdown engine

exports.findAll = function(req, res) {
	// Return all posts
	return PostModel.find(function(err, posts) {
		if (!err) {
			console.log('Sending from server/controllers/posts posts array returned by findAll().');
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

	var imagePath = 'data/img/' + req.body.dateYear + '/' + req.body.dateMonth + '/' + req.body.idReadable;
	imageManagement(req.files, imagePath);

	var keys = liststr2array(req.body.keywords);
	var coordinates = listnum2array(req.body.coordinates);

	//var tokens = marked.lexer(req.body.body);
	//console.log(marked.parser(tokens));
	// TODO: buscar todas las imágenes del post y seleccionar cual va a ser la princial,
	// si no existe usar imagen por defecto. Añadir la principal como un campo del post.
	var coverImageUrl = parseImageRoutes(req.body.body);

	var post = new PostModel({
		title: req.body.title,
		dateYear: req.body.dateYear,
		dateMonth: req.body.dateMonth,
		body: req.body.body,
		coverImage: coverImageUrl,
		idReadable: req.body.idReadable,
		keywords: arrayOfObjects(keys, 'keyword'),
		date: currentTime,
		postType: req.body.postType,
		address: req.body.address,
		phone: req.body.phone,
		url: req.body.url,
		coordinates: arrayOfObjects(coordinates, 'coordinate'),
	});

	return post.save(function(err) {
		if (!err) {
			console.log('Post "' + req.body.title + '" saved.');
			return res.send(post);
		} else {
			console.log(err);
		}
	});

};

exports.update = function(req, res) {
	console.log('Updating post...');

	var query = {_id: req.body._id};
	var updatedValues = {};

	var keysObj = Object.keys(req.body);
	keysObj.forEach(function(val) {
		if (val[0] !== '_') {
			if (val === 'keywords') {
				var keys = liststr2array(req.body[val]);
				updatedValues[val] = arrayOfObjects(keys, 'keyword');
			} else if (val === 'coordinates') {
				var coordinates = listnum2array(req.body[val]);
				updatedValues[val] = arrayOfObjects(coordinates, 'coordinate');
			} else {
				updatedValues[val] = req.body[val];
			}
		}
	});

	PostModel.update(query, { $set: updatedValues }, function(err) {
		if (!err) {
			console.log('Post updated.');
			res.sendStatus(200);
		} else {
			console.log(err);
			res.sendStatus(500);
		}
	});

};

exports.remove = function(req, res) {
	console.log('Removing post...');
	var query = {_id: req.params.id};
	PostModel.findOne(query, 'dateYear dateMonth idReadable', function(err, data) {
		if (!err) {
			var dateYear = data.dateYear;
			var dateMonth = data.dateMonth;
			if (dateMonth < 10) {
				dateMonth = '0' + dateMonth;
			};
			var idReadable = data.idReadable;
			var folderPath = 'data/img/' + dateYear + '/' + dateMonth + '/' + idReadable;
			removeData(folderPath);
			PostModel.find(query).remove(function(err) {
				if (!err) {
					console.log('Post removed.');
					res.sendStatus(200);
				} else {
					console.log(err);
				}
			});
		} else {
			consoel.log(err);
		}
	});
};

