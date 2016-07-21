'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer'); // Files upload

var posts = require('../controllers/posts');

// Multer file upload management
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'data/tmp/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
var upload = multer({ storage: storage });
var fields = [
    {name: 'images', maxCount: 10}
  ];

router.route('/')
  .get(posts.findAll)
  .post(upload.fields(fields), posts.add);

router.route('/:id')
  .get(posts.findById)
  .put(posts.update)
  .delete(posts.remove);

module.exports = router;
