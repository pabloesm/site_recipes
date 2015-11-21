'use strict';

var path = require('path'); // Path utilities
var appRootDir = require('app-root-dir').get(); // Get root directory

exports.sendHtml = function(req, res) {
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
