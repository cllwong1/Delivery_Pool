const { response } = require('express')
const ordersModel = require('../models/ordermodel')
const usersModel = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const axios = require('axios')

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
          return
        }
        if (!Number.isInteger(parseInt(req.body.estDeliveryTime))){
          res.json({error: "numeric field should be numeric"})
          return
        }

        //decode the jwt to retrieve the user iinfo
        const authToken = req.headers.auth_token
        const rawJWT = jwt.decode(authToken)
        const email = rawJWT.email

        //check the user databsase to see if the user exists using the above user info

        usersModel.findOne({
          email: email
        })
        .then(response=>{
          if (!response){
            res.json({message: "no such user in database"})
            return
          }
           //make an api call to geocode the address //store the new order in order model
           const meetupPoint = req.body.meetupPoint
           const encodedadress = encodeURIComponent(meetupPoint)
           axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedadress}&key=${process.env.GEOCODEAPI}`)
           .then(georesponse=>{
               ordersModel.create({
                   userid: response.user_id,
                   contact: response.contact_number,
                   restaurant: req.body.restaurant,
                   deliveryTimeEst: req.body.estDeliveryTime,
                   deliveryFee: req.body.estDeliveryFee,
                   meetupPoint: meetupPoint,
                   location: {type: "Point", coordinates: [georesponse.data.results[0].geometry.location.lng, georesponse.data.results[0].geometry.location.lat]},
                   orderDetails: [{
                     orderUserId: response.user_id,
                     food: [req.body.order]
                   }]
                  })
                  .then(orderresponse=>{
                    res.json({message: "successfully capture order"})
                  })
                  .catch(err=>console.log(err))
                
                  
                  

        })
        .catch(err=> console.log(err))
       
        




    }
        )
        .catch(err=> console.log(err))

}
}
    



module.exports = ordersController