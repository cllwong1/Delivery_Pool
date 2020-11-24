const userModel = require('../models/usermodel')
const mongoose = require('mongoose')
const {Client} = require("@googlemaps/google-maps-services-js")
const client = new Client({});
const axios = require('axios')

const userController = {
    //add the user to the user model
    //convert address to geolocation
    //using geocoding api
    //using mmongodb geolocation search functionality
    new: (req, res)=> {
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=79+Anson+Road&key=AIzaSyDB07W_9m5_zfAes67wlZehgX8XYS-2AV4')
        .then(response=>{
            console.log(response.data.results[0].geometry.location.lat)
        })
        .catch(err=> console.log(err))
    }

}

module.exports = userController