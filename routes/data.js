var express = require('express'),
	router = express.Router(),
	path = require('path'), // Path utilities
	fs = require('fs'); // File system


// To be mounted on '/api/data'
router.route('/img/:year/:postTitle/:photoName')
	.get(function(req, res){
		var year = req.params.year,
			postTitle = req.params.postTitle,
			fileName = req.params.photoName;

		var options = {
			root: path.normalize(__dirname + '/../' + path.join('data', 'img', year, postTitle))
		};

		res.sendFile(fileName, options, function(err){
			if (!err) {
				console.log("Sent: ", fileName);
			} else {
				console.log(err);
				res.status(err.status).end();
			}
		});

	});


module.exports = router;
