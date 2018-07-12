import * as winston from "winston";

const {combine, timestamp, label, printf} = winston.format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.level}] ${info.message}`;
});

const logger = winston.createLogger({
    format: winston.format.json(),
    transports:
        [
            new winston.transports.File({
                filename: 'logs/verbose.log',
                format: combine(
                    winston.format.colorize({all: true}),
                    label({label: 'VERBOSE'}),
                    timestamp(),
                    myFormat
                ),
            })
        ]
});


logger.add(winston.createLogger({
    format: combine(
        winston.format.colorize({all: true}),
        label({label: 'Debug'}),
        timestamp(),
        myFormat
    ),
    transports: [new winston.transports.Console()]
}));

export = logger;