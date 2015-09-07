'use strict';

var express = require('express'),
	bodyParser = require('body-parser');

var options = {port: 3011};

var app = express();

app.use("/", express.static("site"));

app.listen(options.port, function() {
	console.log('Server listening on ' + options.port);
});