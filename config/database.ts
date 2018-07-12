import * as promise from 'bluebird';
import * as logger from './logger';

promise.config({longStackTraces: true});

import {IMain, IDatabase} from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise({
    promiseLib: promise
});

const cn: string = 'postgres://localhost:5432/demo';
const db: IDatabase<any> = pgp(cn);
console.log('connected db');
logger.info(`Connected with DB [${cn}]`);

export = db;