const userModel = require('../models/usermodel')
// const mongoose = require('mongoose')
// const {Client} = require("@googlemaps/google-maps-services-js")
// const client = new Client({});
const axios = require('axios')

const userController = {
    //add the user to the user model
    //convert address to geolocation
    //using geocoding api
    //using mmongodb geolocation search functionality
    //if api call is succesful, store the user info in the user info database
    new: (req, res)=> {
        const formFields = req.body
        const address = req.body.address
        console.log(formFields)
        const encodedadress = encodeURIComponent(address)
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedadress}&key=${process.env.GEOCODEAPI}`)
        .then(response=>{
            console.log(response)
            console.log(formFields.lastname)
            userModel.create({
                first_name: formFields.firstname,
                last_name: formFields.lastname,
                address: address,
                location: {type: "Point", coordinates: [response.data.results[0].geometry.location.lng, response.data.results[0].geometry.location.lat] }
            })
            .then(inserteddouc=>{
                res.json(inserteddouc)
            })
            .catch(err=>{
                res.json(err)
            })
        })
        
        .catch(err=> {console.log(err) 
            res.json(err)})
    }

}

module.exports = userController