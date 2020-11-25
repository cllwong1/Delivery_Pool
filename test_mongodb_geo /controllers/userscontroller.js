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
        const address = '79 Anson Road'
        const encodedadress = encodeURIComponent(address)
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedadress}&key=${process.env.GEOCODEAPI}`)
        .then(response=>{
            console.log(response.data.results[0])
        })
        .catch(err=> console.log(err))
        //res.json(req.body.address)
    }

}

module.exports = userController