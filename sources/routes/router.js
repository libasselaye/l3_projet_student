const express = require("express");
const path = require("path");

//const QuizzesLoader = require("../engine/QuizzesLoader.js");

const __public = path.join(__dirname, "../../public");

/**
 * Router.
 */
const router = express.Router();

// GET home.html page.
router.get("/", function (req, res, next) {
    res.sendFile("html/index.html", { root: __public });
});
router.get("/monitor", function (req, res, next) {
    res.sendFile("html/monitor.html", { root: __public });
});
router.get("/controls", function (req, res, next) {
    res.sendFile("html/controls.html", { root: __public });
});

module.exports = router;
