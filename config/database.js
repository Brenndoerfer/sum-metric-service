"use strict";
var promise = require("bluebird");
var logger = require("./logger");
promise.config({ longStackTraces: true });
var pgPromise = require("pg-promise");
var pgp = pgPromise({
    promiseLib: promise
});
var cn = 'postgres://localhost:5432/demo';
var db = pgp(cn);
console.log('connected db');
logger.info("Connected with DB [" + cn + "]");
module.exports = db;
