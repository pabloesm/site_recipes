'use strict';

var express = require('express'),
	bodyParser = require('body-parser');

var options = {port: 3011},
	app = express(),
	parseUrlencoded = bodyParser.urlencoded({ extended: true });

app.use("/", express.static("site"));
app.use("/", parseUrlencoded);


var edit = require('./routes/posts');
app.use('/api/posts', edit);


app.listen(options.port, function() {
	console.log('Server listening on ' + options.port);
});