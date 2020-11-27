const { response } = require('express')
const ordersModel = require('../models/ordermodel')
const usersModel = require('../models/usermodel')


const ordersController = {

    showAllOrders(req,res) {
        const long= 103.8457
        const lat = 1.2743
        usersModel.createIndexes( { "location" : "2dsphere" } )
        .then(result=> {
            usersModel.aggregate([
                {
                  $geoNear: {
                     near: { 
                       type: "Point",
                       coordinates: [ long , lat]
                     },
                     distanceField: "dist.calculated",
        
                     spherical: true
                  }
                }
               ],(err,data)=>{
                if(err) {
                  console.log(err);
                  return;
                }
                response.json(data);
              })

        })
        .catch(err=>{
            console.log(err)
        })

    },

    newOrder(req, res){
      usersModel.findOne({
        first_name: "Adeline"
      })
      .then(response=>{
        //console.log(response)
        res.json(response)
      }
        
      )
      .catch(err=>{console.log(err)})
    }
}
    



module.exports = ordersController