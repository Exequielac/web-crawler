
'use strict';

const express = require('express');
const AppController = require('./controller');

const router = express.Router();

router.get('/entries', AppController.getEntries);
router.get('/filter/comments', AppController.filterByComments);
router.get('/filter/points', AppController.filterByPoints);

module.exports = router;
