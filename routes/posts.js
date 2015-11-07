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

// Refactor to other file ------------------------------
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
	if (id.length < 17) {
		return 'idReadable';
	} else {
		return '_id';
	}
};

var arrayOfObjects = function(array, key) {
	/* Given an array and a key, this function returns an array of
	objects with key equal to the parameter key and values equal to
	the elements of the array */
	var arr = [];
	array.forEach(function(val){
		var obj = {};
		obj[key] = val;
		arr.push(obj)
	});

	return arr;
};

var bodyMarked = function(input){
	/* Take a JSON object or an array of JSON objects representing post(s), then
	applies markdown to the field 'body' and return the JSON*/
	if( Object.prototype.toString.call(input) === '[object Array]' ) {
		input.forEach(function(el, i){
			input[i] = el.toJSON();
			input[i].body = marked(input[i].body);
		});

	} else {
		input._doc.body = marked(input._doc.body);
	}
	return input;
};

var liststr2array = function(keys) {
	/* Takes a string which contains a list of strings separated by commas.
	Returns an array of trimmed strings.*/
	var array =  keys.split(',');
	return array.map(function(el) { return el.trim(); });
};

var listnum2array = function(keys) {
	/* Takes a string which contains a list of numbers separated by commas.
	Returns an array of trimmed keys.*/
	var array =  keys.split(',');
	return array.map(function(el) { return +el; });
};
// -------------------------------------------



// Mongo DB
mongoose.connect('mongodb://localhost/site_recipes');

var PhotosOthers = new mongoose.Schema({
	photo: String
});

var Keywords = new mongoose.Schema({
	keyword: String
});

var Coordinates = new mongoose.Schema({
	coordinate: Number
});

var PostSchema = new mongoose.Schema({
	title: {type: String, default: 'Post title'},
	body: {type: String, default: 'The post body...'},
	idReadable: {type: String, default: 'post-title'},
	photoMain: {type: String, default: 'http://goo.gl/uzjFKj'},
	photoOthers: [ PhotosOthers ],
	keywords: [ Keywords ],
	date: Date,
	postType: {type: String, default: 'restaurante'},
	address: String,
	phone: Number,
	url: String,
	coordinates: [ Coordinates ]
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
				posts = bodyMarked(posts);
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
		var keys = liststr2array(req.body.keywords)
		var coordinates = listnum2array(req.body.coordinates)

		var urls = photoUrl(req.files, photoPath);
		console.log(urls);

		var post = new PostModel({
			title: req.body.title,
			body: req.body.body,
			idReadable: req.body.idReadable,
			photoMain: urls.photoMain,
			photoOthers: arrayOfObjects(urls.photoOthers, 'photo'),
			keywords: arrayOfObjects(keys, 'keyword'),
			date: currentTime,
			postType: req.body.postType,
			address: req.body.address,
			phone: req.body.phone,
			url: req.body.url,
			coordinates: arrayOfObjects(coordinates, 'coordinate')
		});

		mkdirp(photoPath, function(err){
			if (err) {
				console.error(err);
			} else {
				console.log('Directory ' + req.body.idReadable + ' created.');
				relocate(req.files['photoMain'], photoPath);
				if (req.files['photoOthers'] !== undefined) {
					relocate(req.files['photoOthers'], photoPath);
				}
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


router.route('/category/:id')

	.get(function(req, res){
		// Find by keywords (a.k.a. tags, categories)
		var category = req.params.id;
		console.log('Reached category ' + category);
		return PostModel.find({"postType": category}, function(err, posts){
			if(!err) {
				posts = bodyMarked(posts);
				return res.send(posts);
			} else {
				return console.log(err);
			}
		});
	});


router.route('/:id')

	.get(function(req, res){
		/* Allows searching by different types of :id
		typeOfID() parses the :id
		*/
		if (typeOfID(req.params.id) === '_id') {
			return PostModel.findById(req.params.id, function(err, post){
				if(!err){
					post = bodyMarked(post)
					return res.send(post);
				} else {
					return console.log(err);
				}
			});

		} else {
			return PostModel.findOne({idReadable: req.params.id}, function(err, post){
				if(!err){
					post = bodyMarked(post)
					return res.send(post);
				} else {
					return console.log(err);
				}
			});
		}
	});



module.exports = router;