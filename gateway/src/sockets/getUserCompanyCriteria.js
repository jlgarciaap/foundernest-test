'use strict';

const axios = require('axios');

module.exports = (socketId,ioServer) => (data) => {

    //We have a table with relation between socketsId and User id.
    //In this example we recieve the user_id from client event
    axios.get(`http://localhost:3000/criteria/company/user?id=${data.id}`)
        .then(res => {
            ioServer.to(socketId).emit('USER_COMPANY_CRITERIA_DATA', res.data);
        }).catch(err => console.log(err));


}