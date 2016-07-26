'use strict';

var marked = require('marked'); // Markdown engine
var fs = require('fs'); // File system
var rimraf = require('rimraf'); // rm -rf for node
var path = require('path'); // Path utilities
var appRootDir = require('app-root-dir').get(); // Get root directory
var mkdirp = require('mkdirp'); // Like mkdir -p, but in node.js

var IMAGE_DEFAULT = 'api/data/img/default/default/default.jpg';

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

/**
* Search the main imagen in the post text formated in
* markdown.
*/
exports.parseImageRoutes = function(text) {
	var markdownLinks = getImagesMarkdown(text);
	var urls = getImagesPath(markdownLinks);
	var mainImage = getImageMain(urls);

	return mainImage;
};

/**
* Parses markdown text and extracts images information.
*/
function getImagesMarkdown(textMarkDown) {
	var markdownLinks = [];
	var regex = /(\!\[.*?\]\(.*?\))+/g;
	var match = regex.exec(textMarkDown);
	var url = '';

	while (match != null) {
		markdownLinks.push(match[1]);
		match = regex.exec(textMarkDown);
	}

	return markdownLinks;
};

/**
* Parses markdown images information and extracts urls.
*/
function getImagesPath(markdownLinks) {
	var urls = [];
	markdownLinks.forEach(function(e) {
		var match = /\(.*\)/.exec(e);
		urls.push(match[0].slice(1, match[0].length - 1));
	});

	return urls;
};

function getImageMain(urls) {
	// Get the '_main' if exists, else the first image, else
	// the default image
	var url = '';

	if (urls.length == 0) {
		return IMAGE_DEFAULT;
	};

	urls.forEach(function(e) {
		if (e.indexOf('_main') > -1) {
			url = e;
		};
	});

	if (url.length == 0) {
		url = urls[0];
	}

	return url;
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

/**
* Removes the folder containing images of a given post.
*/
exports.removeData = function(postImagesFolder) {
	var pathToRem = path.join(appRootDir, postImagesFolder);
	rimraf(pathToRem, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Post images folder: ' + postImagesFolder + ' removed. (server/lib/utils)');
		}
	});
};

/**
* Removes the folder containing images of a given post.
*/
exports.removeData2 = function(postImagesFolder) {
	var pathParsed = path.parse(postImagesFolder);
	var pathArray = pathParsed.dir.split(path.sep);
	var pathToRem = path.join(appRootDir, pathArray[1], pathArray[2], pathArray[3], pathArray[4]);
	rimraf(pathToRem, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Post images removed. (server/lib/utils)');
		}
	});
};
