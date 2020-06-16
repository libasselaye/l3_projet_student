const express = require('express');
const path = require('path');

const QuestionLoader = require('../engine/QuestionLoader.js');


const __public = path.join(__dirname, '../../public');

/**
 * Router.
 */

const router = express.Router();

// GET home.html page.
router.get('/', function (req, res, next) {
    res.sendFile('html/index.html', {root: __public});
});

// GET .

router.get('/home', function (req, res, next) {
    var ql = new QuestionLoader();
    res.send(ql.list().length);
});

module.exports = router;
