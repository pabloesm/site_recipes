'use strict';

var path = require('path'); // Path utilities
var appRootDir = require('app-root-dir').get(); // Get root directory

exports.getImg = function(req, res) {
	var year = req.params.year;
	var postTitle = req.params.postTitle;
	var year = req.params.year;
	var postTitle = req.params.postTitle;
	var fileName = req.params.photoName;

	var options = {
		root: path.normalize(appRootDir + '/' + path.join('data', 'img', year, postTitle)),
	};

	res.sendFile(fileName, options, function(err) {
		if (!err) {
			console.log('Sent: ', fileName);
		} else {
			console.log(err);
			res.status(err.status).end();
		}
	});
};
