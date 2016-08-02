'use strict';

var jwt = require('jsonwebtoken');

var adminId = 'auth0|579ccc1ea36458780e9591c1';

exports.userValidation = function(req, res, next) {
	if (req.headers.hasOwnProperty('token')) {
		var decode = jwt.decode(req.headers.token);
		if (decode.sub === adminId) {
			console.log('User: ' + decode.sub);
			next();
		} else {
			console.log('Not valid user.')
			res.send("<p>Permission denied.</p>");
		}

	} else {
		console.log('Not token detected.');
		res.send("<p>Login required.</p>");
	}


};
