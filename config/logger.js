"use strict";
var winston = require("winston");
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, label = _a.label, printf = _a.printf;
var myFormat = printf(function (info) {
    return info.timestamp + " [" + info.level + "] " + info.message;
});
var logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'logs/verbose.log',
            format: combine(winston.format.colorize({ all: true }), label({ label: 'VERBOSE' }), timestamp(), myFormat),
        })
    ]
});
logger.add(winston.createLogger({
    format: combine(winston.format.colorize({ all: true }), label({ label: 'Debug' }), timestamp(), myFormat),
    transports: [new winston.transports.Console()]
}));
module.exports = logger;
