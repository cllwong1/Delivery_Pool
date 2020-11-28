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
    },

    createOrder(req, res){
        const orderbody = req.body
        //ensure jwt is correct for each user
        //check the user for each order, get the user id 
        //check that the user is 
        if (!orderbody.restaurant || !orderbody.estDeliveryTime || !orderbody.estDeliveryFee || !orderbody.meetupPoint|| !orderbody.order){
          res.json({error: "field must not be empty"})
        }
        if (!Number.isInteger(parseInt(req.body.estDeliveryTime))){
          res.json({error: "numeric field should be numeric"})
          return
        }


    }

}
    



module.exports = ordersController