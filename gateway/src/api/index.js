'use strict';

const testSocket = require('./testSocket');

module.exports = (router,socket, cache) => ({
    register: () => {
        router.get('/test/socket', testSocket(socket, cache));
    }
});