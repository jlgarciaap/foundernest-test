'use strict';

const { getCriteria, postCriteria } = require('./criteria');
const { getUserCriteria, postUserCriteria, patchUserCriteria, deleteUserCriteria } = require('./user_criteria');
const { getCompaniesCriteria } = require('./companies_criteria');
const { getUserCompanyCriteria } = require('./user_company_criteria');


module.exports = (router, dbClient) => ({
  register: () => {
      //GETS
      router.get('/criteria', getCriteria(dbClient));
      router.get('/criteria/company',getCompaniesCriteria(dbClient));
      router.get('/criteria/company/user',getUserCompanyCriteria(dbClient));
      router.get('/criteria/user',getUserCriteria(dbClient));
      //POSTS
      router.post('/criteria', postCriteria(dbClient));
      router.post('/criteria/user', postUserCriteria(dbClient));
      //PATCH
      router.patch('/criteria/user', patchUserCriteria(dbClient));
      //DELETE
      router.delete('/criteria/user', deleteUserCriteria(dbClient));
  }

});