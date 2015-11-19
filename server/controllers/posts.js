'use strict';

var path = require('path'); // Path utilities
var mkdirp = require('mkdirp'); // Like mkdir -p, but in node.js
var marked = require('marked'); // Markdown engine
var fs = require('fs'); // File system
var appRootDir = require('app-root-dir').get(); // Get root directory

var PostModel = require('../models/post');

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

exports.findByCategory = function(req, res) {
	// Return all posts in a category
	var category = req.params.id;
	return PostModel.find({postType: category}, function(err, posts) {
		if (!err) {
			console.log('Sending posts by category ' + req.params.id + ' returned by findByCaterory().');
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

exports.sendEditHtml = function(req, res) {
	var filePath = path.normalize(appRootDir + '/site/edit.html');
	res.sendFile(filePath, function(err) {
		if (!err) {
			console.log('Sent: ', filePath);
		} else {
			console.log(err);
			res.status(err.status).end();
		}
	});
};

// -------------------------------------------
// Helpers
// -------------------------------------------
var relocate = function(files, newPath) {
	files.forEach(function(file) {
		var dest = newPath + '/' + file.filename;
		fs.rename(file.path, dest, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Renamed.');
			}
		});
	});
};

var photoUrl = function(files, path) {
	var main = '';
	var others = [];

	if ('photoMain' in files) {
		main = 'api/' + path + '/' + files.photoMain[0].filename;
	}

	if ('photoOthers' in files) {
		files.photoOthers.forEach(function(el) {
			var elPath = 'api/' + path + '/' + el.filename;
			others.push(elPath);
		});
	}

	return {
		photoMain: main,
		photoOthers: others,
	};
};

var typeOfID = function(id) { // MAKE THIS MORE ROBUST!
	if (id.length < 17 || id.indexOf('-') >= 0) {
		return 'idReadable';
	} else {
		return '_id';
	}
};

var arrayOfObjects = function(array, key) {
	/* Given an array and a key, this function returns an array of
	  	objects with key equal to the parameter key and values equal to
	  	the elements of the array */
	var arr = [];
	array.forEach(function(val) {
		var obj = {};
		obj[key] = val;
		arr.push(obj);
	});

	return arr;
};

var bodyMarked = function(input) {
	/* Take a JSON object or an array of JSON objects representing post(s), then
	  	applies markdown to the field 'body' and return the JSON*/
	if (Object.prototype.toString.call(input) === '[object Array]') {
		input.forEach(function(el, i) {
			input[i] = el.toJSON();
			input[i].body = marked(input[i].body);
		});

	} else {
		input._doc.body = marked(input._doc.body);
	}

	return input;
};

var liststr2array = function(keys) {
	/* Takes a string which contains a list of strings separated by commas.
	  	Returns an array of trimmed strings.*/
	var array =  keys.split(',');
	return array.map(function(el) { return el.trim(); });
};

var listnum2array = function(keys) {
	/* Takes a string which contains a list of numbers separated by commas.
	  	Returns an array of trimmed keys.*/
	var array =  keys.split(',');
	return array.map(function(el) { return +el; });
};
