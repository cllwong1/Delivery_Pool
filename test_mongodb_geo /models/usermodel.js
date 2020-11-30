const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        //required: true,
        max: 100
    },
    last_name: {
        type: String,
        //required: true,
        max: 100
    },
    contact_number:{
        type: Number
    },
    user_id: {
        type: String,
        unique: true
    },
    slug: {
        type: String,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 100
    },
    default_address: {
        type: String,
        //required: true,
        default: Date.now
    },
    pwsalt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    location:{
      
    }
}
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel