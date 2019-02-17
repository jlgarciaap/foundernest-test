'use strict';

const axios = require('axios');

module.exports = (socketId,ioServer) => (data) => {

    //In this case we recieve the data directly from the client event and passthrought to the api post endpoint
    //As a reply we can emit the data recieved from the endpoint or we can emit a event to notify the client
    //to update

    axios
        .post('http://localhost:3000/criteria/user',data)
        .then(res => {
            ioServer.to(socketId).emit('ADD_USER_CRITERIA_DATA', res.data);
        })
        .catch(err => ioServer.to(socketId).emit('ERROR',err));

}