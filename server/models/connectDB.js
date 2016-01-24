'use strict';

var mongoose = require('mongoose'); // Mongo database

// Mongo DB
mongoose.connect('mongodb://localhost/site_recipes');

var db = mongoose.connection;

module.exports = exports = function() {
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function() {
		console.log('Connected to MongoDB');
	});
};
