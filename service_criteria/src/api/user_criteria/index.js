'use strict';

const getUserCriteria = require('./getUserCriteria');
const postUserCriteria = require('./postUserCriteria');
const patchUserCriteria = require('./patchUserCriteria');
const deleteUserCriteria = require('./deleteUserCriteria');

module.exports = {
    getUserCriteria,
    postUserCriteria,
    patchUserCriteria,
    deleteUserCriteria
}