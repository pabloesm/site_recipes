'use strict';

var express = require('express');
var router = express.Router();

var data = require('../controllers/data');

router.route('/img/:year/:postTitle/:photoName')
  .get(data.getImg);

router.route('/img/:year/:month/:postTitle/:imageName')
  .get(data.getImageNew);


module.exports = router;
