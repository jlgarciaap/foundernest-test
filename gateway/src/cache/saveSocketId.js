'use strict';

module.exports = (socketId, cache) => (data) => {

    cache.set('id_store', { [data.user_id] : socketId }, (err) => {
        if(err) console.log(err);
        console.log('Socket ID saved succesfully');
    });

}