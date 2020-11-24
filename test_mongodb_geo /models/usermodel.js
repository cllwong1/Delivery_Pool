const mongoose = require('mongoose')

const userschema = new mongoose.Schema (
    { first_name: {type: String, required: true },
    last_name: {type: String, required: true},
    address: {type:String, required:true},
    location: {
        type: { type: String },
        coordinates: [Number],
      }

}

)

const usermodel = mongoose.model('User', userschema)

module.exports = usermodel