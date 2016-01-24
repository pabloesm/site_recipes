'use strict';

var express = require('express');
var router = express.Router();

var category = require('../controllers/category');

router.route('/')
	.get(category.nothing2seeHere);

router.route('/:id')
	.get(category.findByCategory);

module.exports = router;
