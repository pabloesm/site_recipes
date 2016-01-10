'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var	options = {port: 3011};
var app = express();
var parseUrlencoded = bodyParser.urlencoded({ extended: true });

app.use('/', express.static('site'));
app.use('/', parseUrlencoded);
app.use('/', bodyParser.json()); // for parsing application/json

var connectDB = require('./server/models/connectDB');
connectDB();

// anything beginning with "/api" will go into this
var api = require('./server/routes');
app.use('/api', api);

// // Routes
// var postsRoute = require('./server/routes/posts');
// app.use('/api/posts', postsRoute);

// var dataRoute = require('./server/routes/data');
// app.use('/api/data', dataRoute);

app.listen(options.port, function() {
	console.log('Server listening on ' + options.port);
});
