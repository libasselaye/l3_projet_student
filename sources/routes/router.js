const express = require("express");
const path = require("path");

const QuizzesLoader = require("../engine/QuizzesLoader.js");

const __public = path.join(__dirname, "../../public");

/**
 * Router.
 */
const router = express.Router();

// GET home.html page.
router.get("/", function (req, res, next) {
    res.sendFile("html/index.html", { root: __public });
});

// GET .
router.get("/quizzes", function (req, res, next) {
    // var query = QuizzesLoader.getQuizzesByType(
    //     QuizzesLoader.QUESTION_TYPE_NUMBER,
    //     5
    // );
    // if (query) {
    //     query.exec(function (error, quizzes) {
    //         if (!error) {
    //             res.json(quizzes);
    //         }
    //     });
    // } else {
    //     res.json(500, err);
    // }
});

module.exports = router;
