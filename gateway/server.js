'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const server = require('http').createServer(app);

const Cacheman = require('cacheman');
const cache = new Cacheman();

const socket = require('./src/sockets')(server, cache).init();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Initializes api controllers
const controllers = require('./src/api')(router, socket, cache);
controllers.register();
app.use('/', router);

// exports server instance
module.exports = server;