const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()


const PORT = process.env.port || 5000;
const mongoURI = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
mongoose.set('useFindAndModify', false)

app.use(express.urlencoded({extended:true}))

mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(result=>{console.log('successfully connected')
app.listen(PORT)
})

    
.catch(err=> console.log(err))
