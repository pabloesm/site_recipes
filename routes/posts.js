var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'), // Mongo database
	path = require('path'), // Path utilities
	multer = require('multer'), // Files upload
	mkdirp = require('mkdirp'), // Like mkdir -p, but in node.js
	marked = require('marked'), // Markdown engine
	fs = require('fs'); // File system


// Multer file upload management
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'data/tmp/uploads')
	},
	filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage })

var	fields = [
		{name: 'photoMain', maxCount: 1},
		{name: 'photoOthers', maxCount: 10}
	];

// Refactor to other file
var relocate = function(files, newPath){
	files.forEach(function(file){
		var dest = newPath + '/' + file.filename;
		fs.rename(file.path, dest, function(err){
			if (err) {
				console.log(err);
			} else {
				console.log('Renamed.');
			}
		});
	});
};

var photoUrl = function(files, path){
	var main = '';
	var others = [];

	if ('photoMain' in files){
		main = 'api/' + path + '/' + files.photoMain[0].filename;
	}

	if ('photoOthers' in files){
		files.photoOthers.forEach(function(el){
			var elPath = 'api/' + path + '/' + el.filename;
			others.push(elPath);
		});
	}

	return {
		photoMain: main,
		photoOthers: others
	}
};

var typeOfID = function(id) { // MAKE THIS MORE ROBUST!
	if (id.length < 15) {
		return 'idReadable';
	} else {
		return '_id';
	}
};



// Mongo DB
mongoose.connect('mongodb://localhost/site_recipes');

var PostSchema = new mongoose.Schema({
	title: {type: String, default: 'Post title'},
	body: {type: String, default: 'The post body...'},
	idReadable: {type: String, default: 'post-title'},
	photoMain: {type: String, default: 'http://goo.gl/uzjFKj'},
	date: Date,
	keywords: String
});

var PostModel = mongoose.model("Post", PostSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	console.log('Connected to MongoDB')
});


// To be mounted on '/api/posts'
router.route('/')

	.get(function(req, res){
		return PostModel.find(function(err, posts){
			if (!err) {
				console.log('Sending posts array.')
				return res.send(posts);
			} else {
				return console.log(err);
			}
		});
	})

	.post(upload.fields(fields), function(req, res){
		console.log(req.headers);

		var date = new Date(),
			year = date.getFullYear(),
			currentTime = date.getTime();

		var photoPath = 'data/img/' + year + '/' + req.body.idReadable;

		var urls = photoUrl(req.files, photoPath);
		console.log(urls);

		var post = new PostModel({
			title: req.body.title,
			body: req.body.body,
			idReadable: req.body.idReadable,
			photoMain: urls.photoMain,
			date: currentTime,
			keywords: req.body.keywords
		});

		mkdirp(photoPath, function(err){
			if (err) {
				console.error(err);
			} else {
				console.log('Directory ' + req.body.idReadable + ' created.');
				relocate(req.files['photoMain'], photoPath);
				relocate(req.files['photoOthers'], photoPath);
			}
		});

		return post.save(function(err){
			if (!err) {
				console.log('Post "' + req.body.title + '" saved');
				return res.send(post);
			} else {
				console.log(err);
			}
		});

	});


//  /api/posts/edit
router.route('/edit')

	.get(function(req, res){
		var filePath = path.normalize(__dirname + '/../site/edit.html');
		res.sendFile(filePath, function(err){
			if (!err) {
				console.log('Sent: ', filePath);
			} else {
				console.log(err);
				res.status(err.status).end();
			}
		});
	});


router.route('/:id')

	.get(function(req, res){
		/* Allows searching by different types of :id
		typeOfID() parses the :id
		*/
		if (typeOfID(req.params.id) == '_id') {
			return PostModel.findById(req.params.id, function(err, post){
				if(!err){
					post._doc.body = marked(post._doc.body)
					return res.send(post);
				} else {
					return console.log(err);
				}
			});

		} else {
			return PostModel.findOne({idReadable: req.params.id}, function(err, post){
				if(!err){
					post._doc.body = marked(post._doc.body)
					return res.send(post);
				} else {
					return console.log(err);
				}
			});
		}
	});


module.exports = router;