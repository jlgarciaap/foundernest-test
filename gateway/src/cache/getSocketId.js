'use strict'

module.exports = (cache, userId) => {

    return cache.get('id_store', (err, value) => {

        if (err) {
            return err;
        }

        console.log(value);

        return value[userId];

    });

}