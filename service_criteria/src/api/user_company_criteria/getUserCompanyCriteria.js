'use strict';

module.exports = (dbClient) => async (req, res) => {
        //Get all criteria for all companies from one user
        //In a real world we use JWT to login and identify the user not use id like param
    const { id } = req.query;

    return await dbClient('user_company_criteria_view')
        .where(function (){
            if (id){
                this.where('user_id', id)
            }
        })
        .then(rows => res.send(rows))
        .catch((err) => (
            console.log(err),
            res.status(500).send({err: 'Sorry, Skynet problems', code: err.code, detail: err.detail})
        ));

}