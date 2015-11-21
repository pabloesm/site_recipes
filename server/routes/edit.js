'use strict';

var express = require('express');
var router = express.Router();

var edit = require('../controllers/edit');

router.route('/')
	.get(edit.sendHtml);

module.exports = router;
