'use strict';

const io = require('socket.io');
//TODO: Event name

const getUserCriteria = require('./getUserCriteria');
const postUserCriteria = require('./postUserCriteria');
const getUserCompanyCriteria = require('./getUserCompanyCriteria');

const saveSocketId = require('../cache/saveSocketId');

module.exports = (server, cache) =>({
    init: () => {
        const ioServer = io(server);

        ioServer.on('connection', socket =>{
            console.log('Socket server connected');

            //We can save socketId in cache to use with API in this moment for example
            socket.on('SAVE_USER_ID', saveSocketId(socket.client.id, cache));

            socket.on('GET_USER_CRITERIA', getUserCriteria(socket.client.id, ioServer));
            socket.on('POST_USER_CRITERIA', postUserCriteria(socket.client.id, ioServer));
            socket.on('GET_USER_COMPANY_CRITERIA', getUserCompanyCriteria(socket.client.id, ioServer));
        });

        return ioServer;
    }
});
