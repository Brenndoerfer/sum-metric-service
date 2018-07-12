"use strict";
var express = require("express");
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/demo', function (req, res, next) {
    res.status(200).send('Demo API Endpoint Response');
});
module.exports = router;
