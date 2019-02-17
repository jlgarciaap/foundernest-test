'use strict';

module.exports = (dbClient)=> async (req, res) => {
    //Get criteria from a specific user. In a real world we use JWT to login and identify the user
    const { id } = req.query;

        return await dbClient('user_criteria_view')
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