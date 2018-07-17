import * as express from 'express';
import * as logger from '../config/logger'

import * as createDOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';
import * as Deque from 'double-ended-queue';
import * as isNumber from 'is-number';

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const router = express.Router();
const cache = new Map();
const expireQueues = new Map();
const EXPIRE_AFTER = 60 * 60 * 1000; // 1 hour

interface IExpire {
    metricKey: string,
    addTime: number,
    bodyValue: number
};


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Sum Metric Service'});
});

router.post('/metric/:metric_key([a-zA-Z0-9_]+)', function (req, res, next) {

    if (!req.params.metric_key) {
        return res.status(400).send('Invalid or missing metric key');
    }
    if (!req.body.value || !isNumber(req.body.value)) {
        return res.status(400).send('Missing or invalid body parameter: value');
    }

    let bodyValue: number = parseInt(DOMPurify.sanitize(req.body.value));
    let metricKey: string = DOMPurify.sanitize(req.params.metric_key);

    if (cache.has(metricKey)) {
        cache.set(metricKey, parseInt((cache.get(metricKey)) + bodyValue));
    } else {
        expireQueues.set(metricKey, new Deque());
        cache.set(metricKey, bodyValue);
    }

    let addTime = new Date().getTime();
    let expireObj: IExpire = {metricKey, addTime, bodyValue};

    let queue = expireQueues.get(metricKey);
    queue.push(expireObj);

    logger.info(`Added Value: ${bodyValue} to Key: ${metricKey}`);

    res.status(200).json({result: 'success'});
});

router.get('/metric/:metric_key([a-zA-Z0-9_]+)/sum', function (req, res, next) {

    if (!req.params.metric_key) {
        return res.status(400).send('Invalid or missing metric key');
    }

    let metricKey: string = DOMPurify.sanitize(req.params.metric_key);
    if (!cache.has(metricKey)) {
        return res.status(400).send('Key not found');
    }

    let queue = expireQueues.get(metricKey);

    while (!queue.isEmpty() && queue.get(0).addTime < new Date().getTime() - EXPIRE_AFTER) {
        let front: IExpire = queue.get(0);
        cache.set(metricKey, parseInt(cache.get(metricKey)) - front.bodyValue);
        logger.info(`Removed Value: ${front.bodyValue} from Key: ${metricKey} (added at: ${new Date(front.addTime).toISOString()})`);
        queue.shift();
    }

    let sum: number = cache.get(metricKey);

    res.status(200).json(sum);

});

export = router;
