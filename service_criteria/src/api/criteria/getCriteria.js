'use strict';

module.exports = (dbClient) => async (req, res) => {
    //Get criteria with IDS

    const { id, name} = req.query;

    return await dbClient('criteria')
        .select('criteria_id','name')
        .where(function (){
            if (id){
                this.where('criteria_id', id)
            } else if (name){
                this.where('name','like',`%${name}%`)
            }
        })
        .then(rows => res.send(rows))
        .catch((err) => (
            console.log(err),
            res.status(500).send({err: 'Sorry, Skynet problems', code: err.code, detail: err.detail})
        ));
}