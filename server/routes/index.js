'use strict';

var router = require('express').Router();

// split up route handling
router.use('/posts', require('./posts'));
router.use('/category', require('./category'));
router.use('/edit', require('./edit'));
router.use('/data', require('./data'));

module.exports = router;
