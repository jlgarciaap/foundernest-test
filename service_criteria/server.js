'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const server = require('http').createServer(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const { user, password, dbHostname, dbName, dbPort } = require('./db/dbConfig');
const config = {
    client: 'pg',
    connection: `postgres://${user}:${password}@${dbHostname}:${dbPort}/${dbName}`
}
const knex = require('./db').connect(config);


// Initializes api controllers
const controllers = require('./src/api')(router, knex);
controllers.register();
app.use('/', router);

// exports server instance
module.exports = server;