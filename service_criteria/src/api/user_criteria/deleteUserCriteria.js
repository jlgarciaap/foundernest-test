'use strict';

module.exports = (dbClient) => async (req, res) => {
    //Delete User Criteria
    const { user_id, criteria_id } = req.body;

    if (!criteria_id || !user_id ) {
        return res.status(400).send({error: 'We need 2 params: criteria_id and user_id', receive: { criteria_id, user_id }})
     }

     return await dbClient('user_criteria')
                    .where({ criteria_id, user_id })
                    .del()
                    .then(result => res.send({result: 'Delete successfully', data: result}))
                    .catch((err) => (
                        console.log(err),
                        res.status(500).send({err: 'Sorry, Skynet problems', code: err.code, detail: err.detail})
                    ));


}