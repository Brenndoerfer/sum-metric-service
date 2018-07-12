import * as express from 'express'

const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/demo', function (req, res, next) {
    res.status(200).send('http://notablehealth.com/');
});

export = router;
