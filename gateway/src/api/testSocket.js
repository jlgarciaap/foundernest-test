'use strict';

const getSocketId = require('../cache/getSocketId');

module.exports = (socket, cache) => (req, res) => {
    try{
        socket.to(getSocketId(cache, req.query.id)).emit('DATA_ID',['THINGS']);
        res.status(201).send({
            message: `Sent event TEST`
        });

    } catch (err){
        return res.status(500).send({Error: err});
    }

};