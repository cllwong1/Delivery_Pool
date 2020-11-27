const mongoose = require('mongoose')

// const userschema = new mongoose.Schema (
//     {first_name: {type: String, required: true },
//     last_name: {type: String, required: true},
//     address: {type:String, required:true},
//     location: {
//         type: { type: String },
//         coordinates: [Number],
//       }

// }

// )

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  img: {type: String, default: '/users/default-profile-icon-4.jpg'},
  email: {type: String, unique:true},
  contact:{type: Number},
  default_address:{type:String, required: true},
  userid: {type: String, unique: true},
  slug: {type: String, unique:true},
  pwsalt: {type: String, unique:true},
 hashpw: {type: String, unique: true},
 location: {
          type: { type: String },
          coordinates: [Number],
        }
 
}
)



 const usermodel = mongoose.model('User', userSchema)

 module.exports = usermodel