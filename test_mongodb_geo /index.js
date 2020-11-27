const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
const userController = require('./controllers/userscontroller')
const orderController = require('./controllers/orderscontroller')

app.use(cors())

app.options('*', cors()) 


const PORT = process.env.port || 5000;
const mongoURI = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)

app.use(express.urlencoded({extended:true}))

//index page of orders
app.get('/api/v1/orders', orderController.showAllOrders)

//post a new user (registration)
app.post('/api/v1/users/new', userController.new) 

//create a new order
app.get('/api/v1/users/neworder', orderController.newOrder)



mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(result=>{console.log('successfully connected')
app.listen(PORT)
})

    
.catch(err=> console.log(err))
