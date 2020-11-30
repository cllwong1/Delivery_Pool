const UserModel = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const SHA256 = require("crypto-js/sha256")
const uuid = require('uuid')

// const mongoose = require('mongoose')
// const {Client} = require("@googlemaps/google-maps-services-js")
// const client = new Client({});
const axios = require('axios')

const userController = {

    register: (req, res) => {
        // try the library at https://ajv.js.org/ to validate user's input
           UserModel.findOne({
               email: req.body.email
                })
                   .then(result => {
                       if (result) {
                           res.statusCode = 400
                           res.json({
                               "success": false,
                               "message": "Username already exists"
                           })
                           return
                       }
                   // if found in DB, means email has already been take, redirect to registration page
   
                   // no document found in DB, can proceed with registration
   
                   // generate uuid as salt
                   const salt = uuid.v4()
   
                   // hash combination using bcrypt
                   const combination = salt + req.body.password
   
                   // hash the combination using SHA256
                   const hash = SHA256(combination).toString()
   
                   // create user in DB
                   UserModel.create({
                       first_name: req.body.first_name,
                       last_name: req.body.last_name,
                       email: req.body.email,
                       contact_number: req.body.contact_number,
                       user_id: req.body.user_id,
                       default_address: req.body.default_address,
                       pwsalt: salt,
                       hash: hash
                   })
                       .then(createResult => {
                           res.json({
                               "success": true,
                               "message": "New User is Registered"
                           })
                       }
                           )
                       .catch(err => {
                           console.log(err)
                           res.statusCode = 500
                           res.json({
                               success: false,
                               message: "unable to register user due to unexpected error"
                           })
                       })
               .catch(err => {
                   res.statusCode = 500
                   res.json({
                       success: false,
                       message: "unable to register due to unexpected error"
                   })
               })
           })
       },
   
       login: (req, res) => {
           // validate input here on your own
           //console.log(req.body)
   
           // gets user with the given email
           UserModel.findOne({
               email: req.body.email
           })
               .then(result => {
                   // check if result is empty, if it is, no user, so login fail, return err as json response
                   if (!result) {
                       res.statusCode = 401
                       res.json({
                           "success": false,
                           "message": "Either username or password is wrong"
                       })
                       return
                   }
   
                   // combine DB user salt with given password, and apply hash algo
                   const hash = SHA256(result.pwsalt + req.body.password).toString()
   
                   // check if password is correct by comparing hashes
                   if (hash !== result.hash) {
                       res.statusCode = 401
                       res.json({
                           "success": false,
                           "message": "Either username or password is wrong"
                       })
                       return
                   }
   
                   // login successful, generate JWT
                   const token = jwt.sign({
                       first_name: result.first_name,
                       last_name: result.last_name,
                       email: result.email,
                   }, process.env.JWT_SECRET, {
                       algorithm: 'HS384',
                       expiresIn: "1h"
                   })
   
                   // decode JWT to get raw values
                   const rawJWT = jwt.decode(token)
                   
   
                   // return token as json response
                   res.json({
                       success: true,
                       token: token,
                       expiresAt: rawJWT.exp
                   })
               })
               .catch(err => {
                   res.statusCode = 500
                   res.json({
                       success: false,
                       message: "unable to login due to unexpected error"
                   })
                   console.log(err)
                   
               })
       },


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