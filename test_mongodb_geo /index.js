const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
const usersController = require('./controllers/userscontroller')
const orderController = require('./controllers/orderscontroller')
const jwt = require('jsonwebtoken')

app.use(cors())

app.options('*', cors()) 


const PORT = process.env.port || 5000;
const mongoURI = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//index page of orders
app.get('/api/v1/orders', orderController.showAllOrders)


//user registration
app.post('/api/v1/users/register', usersController.register)

// user login route
app.post('/api/v1/users/login', usersController.login)

//create a new order
app.get('/api/v1/users/neworder', orderController.newOrder)

//post a new order
app.post('/api/v1/users/neworder/create', verifyJWT, orderController.createOrder)

//index page show all orders that are pending (joined)
app.get('/api/v1/users/ordersjoined', verifyJWT, orderController.joinedOrdersPending)

//index page show all orders that are pending (created by users)
app.get('/api/v1/users/orderscreated',verifyJWT, orderController.createdOrdersPending)

//amend a particular order
app.post('/api/v1/users/orderscreated/:_id', verifyJWT, orderController.amendCreatedOrder)



mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(result=>{console.log('successfully connected')
app.listen(PORT)
})

    
.catch(err=> console.log(err))

function verifyJWT(req, res, next) {
    // get the jwt token from the request header
    const authToken = req.headers.auth_token
    
    // check if authToken header value is empty, return err if empty
    if (!authToken) {
      res.json({
        success: false,
        message: "Auth header value is missing"
      })
      return
    }
  
    // verify that JWT is valid and not expired
    try {
      // if verify success, proceed
      const userData = jwt.verify(authToken, process.env.JWT_SECRET, {
        algorithms: ['HS384']
      })
      next()
    } catch(err) {
      // if fail, return error msg
      res.json({
        success: false,
        message: "Auth token is invalid"
      })
      return
    }
  }