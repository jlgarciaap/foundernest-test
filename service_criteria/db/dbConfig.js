'use strict';

const user = process.env.DB_USERNAME || 'postgres';
const password = process.env.DB_PASSWORD || 'fnest1234';
const dbName = process.env.DB_NAME || 'fnestdb';
const dbPort = process.env.DB_PORT || 5432;
const dbHostname = process.env.DB_HOSTNAME || 'localhost';

module.exports = {
    user,
    password,
    dbName,
    dbPort,
    dbHostname
}
