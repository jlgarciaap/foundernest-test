'use strict';

module.exports = (dbClient) => async (req, res) => {
        //Get criteria from all companies
        const { id, name} = req.query;

        return await dbClient('company_criteria_view')
            .where(function (){
                if (id){
                    this.where('company_id', id)
                } else if (name){
                    this.where('company_name','like',`%${name}%`)
                }
            })
            .then(rows => res.send(rows))
            .catch((err) => (
                console.log(err),
                res.status(500).send({err: 'Sorry, Skynet problems', code: err.code, detail: err.detail})
            ));

}