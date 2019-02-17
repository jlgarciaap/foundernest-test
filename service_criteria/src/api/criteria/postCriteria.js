'use strict';

module.exports = (dbClient) => async (req, res) => {
    //Post new criteria
    const { criteria_id, name } = req.body;

    if (!criteria_id || !name) {
       return res.status(400).send({error: 'We need a criteria_id and a name params', receive: { criteria_id, name }})
    }

    return await dbClient('criteria')
        .returning(['criteria_id','name'])
        .insert({ criteria_id, name})
        .then(result => res.send({result: 'Insert successfull', data: result}))
        .catch((err) => (
            console.log(err),
            res.status(500).send({err: 'Sorry, Skynet problems', code: err.code, detail: err.detail})
        ));
}