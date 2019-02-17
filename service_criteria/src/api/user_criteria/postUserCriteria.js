'use strict';

module.exports = (dbClient) => async (req, res) => {
    //Post new User Criteria
    const { user_id, criteria_id, interest } = req.body;

    if (!criteria_id || !user_id || !interest) {
       return res.status(400).send({error: 'We need 3 params: criteria_id, user_id and interest', receive: { criteria_id, user_id, interest }})
    }

    return await dbClient('user_criteria')
        .returning(['criteria_id', 'user_id', 'interest'])
        .insert({ user_id, criteria_id, interest })
        .then(result => res.send({result: 'Insert successfull', data: result}))
        .catch((err) => (
            console.log(err),
            res.status(500).send({err: 'Sorry, Skynet problems', code: err.code, detail: err.detail})
        ));
}