'use strict';

var marked = require('marked'); // Markdown engine
var fs = require('fs'); // File system
var rimraf = require('rimraf'); // rm -rf for node
var path = require('path'); // Path utilities
var appRootDir = require('app-root-dir').get(); // Get root directory
var mkdirp = require('mkdirp'); // Like mkdir -p, but in node.js

// -------------------------------------------
// Helpers
// -------------------------------------------
exports.relocate = function(files, newPath) {
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

/**
* Processes the images uploaded in each post. The images
* are moved (and renamed) from the temporal folder to the post folder,
* which is created as necessary. In addition, they should be
* renamed to maintain the orignal name. Temporal files are removed
* after this operation.
*
* @param {Object} files whose property 'images' in an array
* with an element per image. Each element contains, among other
* fields, the path and the original name.
* @param {String} path indicates the path corresponding to the
* current post.
*/
exports.imageManagement = function(files, path) {
	if (files.images.length < 1) {
		return;
	}
	mkdirp.sync(path);
	files.images.forEach(function(img) {
		var oldPath = img.path;
		var newPath = path + '/' + img.originalname;
		fs.renameSync(oldPath, newPath);
		console.log('Image ' + img.originalname + ' relocated.');
	});
};

exports.photoUrl = function(files, path) {
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

exports.typeOfID = function(id) { // MAKE THIS MORE ROBUST!
	if (id.length < 17 || id.indexOf('-') >= 0) {
		return 'idReadable';
	} else {
		return '_id';
	}
};

exports.arrayOfObjects = function(array, key) {
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

exports.bodyMarked = function(input) {
	/* Take a JSON object or an array of JSON objects representing post(s), then
	  	applies markdown to the field 'body' and return the JSON*/
	if (Object.prototype.toString.call(input) === '[object Array]') {
		input.forEach(function(el, i) {
			input[i] = el.toJSON();
			input[i].body = marked(input[i].body);
		});

	} else if (input !== null) {
		input._doc.body = marked(input._doc.body);
	}

	return input;
};

exports.liststr2array = function(keys) {
	/* Takes a string which contains a list of strings separated by commas.
	  	Returns an array of trimmed strings.*/
	var array =  keys.split(',');
	return array.map(function(el) { return el.trim(); });
};

exports.listnum2array = function(keys) {
	/* Takes a string which contains a list of numbers separated by commas.
	  	Returns an array of trimmed keys.*/
	var array =  keys.split(',');
	return array.map(function(el) { return +el; });
};

exports.removeData = function(pathImage) {
	/* pathImage indicates the folder where post images are stored. This function
	removes that folder and all the images. */
	var pathParsed = path.parse(pathImage);
	var pathArray = pathParsed.dir.split(path.sep);
	var pathToRem = path.join(appRootDir, pathArray[1], pathArray[2], pathArray[3], pathArray[4]);
	rimraf(pathToRem, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Post images removed.');
		}
	});
};
