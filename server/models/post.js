'use strict';

var mongoose = require('mongoose'); // Mongo database

var PhotosOthers = new mongoose.Schema({
	photo: String,
});

var Keywords = new mongoose.Schema({
	keyword: String,
});

var Coordinates = new mongoose.Schema({
	coordinate: Number,
});

var PostSchema = new mongoose.Schema({
	title: {type: String, default: 'Post title'},
	dateYear: Number,
	dateMonth: Number,
	body: {type: String, default: 'The post body...'},
	coverImage: String,
	idReadable: {type: String, default: 'post-title'},
	keywords: [Keywords],
	date: Date,
	postType: {type: String, default: 'restaurante'},
	address: String,
	phone: Number,
	url: String,
	coordinates: [Coordinates],
});

module.exports = exports = mongoose.model('Post', PostSchema);
