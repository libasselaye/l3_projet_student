const express = require('express');
const path = require('path');

const __public = path.join(__dirname, '../../public');

/**
 * Router.
 */

const router = express.Router();

// GET home.html page.
router.get('/', function(req, res, next) {
  res.sendFile('html/index.html', { root: __public });
});

module.exports = router;
