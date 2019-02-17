'use strict';

const knex = require('knex');




module.exports = {
    connect: (config) => knex(config),
}