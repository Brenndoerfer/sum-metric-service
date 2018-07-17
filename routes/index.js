"use strict";
var express = require("express");
var logger = require("../config/logger");
var createDOMPurify = require("dompurify");
var jsdom_1 = require("jsdom");
var Deque = require("double-ended-queue");
var isNumber = require("is-number");
var window = (new jsdom_1.JSDOM('')).window;
var DOMPurify = createDOMPurify(window);
var router = express.Router();
var cache = new Map();
var expireQueues = new Map();
var EXPIRE_AFTER = 60 * 60 * 1000; // 1 hour
;
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Sum Metric Service' });
});
router.post('/metric/:metric_key([a-zA-Z0-9_]+)', function (req, res, next) {
    if (!req.params.metric_key) {
        return res.status(400).send('Invalid or missing metric key');
    }
    if (!req.body.value || !isNumber(req.body.value)) {
        return res.status(400).send('Missing or invalid body parameter: value');
    }
    var bodyValue = parseInt(DOMPurify.sanitize(req.body.value));
    var metricKey = DOMPurify.sanitize(req.params.metric_key);
    if (cache.has(metricKey)) {
        cache.set(metricKey, parseInt((cache.get(metricKey)) + bodyValue));
    }
    else {
        expireQueues.set(metricKey, new Deque());
        cache.set(metricKey, bodyValue);
    }
    var addTime = new Date().getTime();
    var expireObj = { metricKey: metricKey, addTime: addTime, bodyValue: bodyValue };
    var queue = expireQueues.get(metricKey);
    queue.push(expireObj);
    logger.info("Added Value: " + bodyValue + " to Key: " + metricKey);
    res.status(200).json({ result: 'success' });
});
router.get('/metric/:metric_key([a-zA-Z0-9_]+)/sum', function (req, res, next) {
    if (!req.params.metric_key) {
        return res.status(400).send('Invalid or missing metric key');
    }
    var metricKey = DOMPurify.sanitize(req.params.metric_key);
    if (!cache.has(metricKey)) {
        return res.status(400).send('Key not found');
    }
    var queue = expireQueues.get(metricKey);
    while (!queue.isEmpty() && queue.get(0).addTime < new Date().getTime() - EXPIRE_AFTER) {
        var front = queue.get(0);
        cache.set(metricKey, parseInt(cache.get(metricKey)) - front.bodyValue);
        logger.info("Removed Value: " + front.bodyValue + " from Key: " + metricKey + " (added at: " + new Date(front.addTime).toISOString() + ")");
        queue.shift();
    }
    var sum = cache.get(metricKey);
    res.status(200).json(sum);
});
module.exports = router;
