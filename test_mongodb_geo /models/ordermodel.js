const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema( {
  userid: {type: String},
  slug: {type: String},
  contact: {type: Number},
  restaurant: {type: String, required: true},
  deliveryTimeEst: {type: String, required: true},
  deliveryFee: {type: Number, required: true},
  meetupPoint: {type: String},
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  distance: {type: Number},
  usersjoined: [String],
  orderDetails: [{
    orderUserId: String,
    food: [String]
  }],
  isFfulfilled: {type: Boolean, default: false}

} )

orderSchema.index({ "location": "2dsphere" });

const orderModel = mongoose.model('New1order', orderSchema )

module.exports= orderModel
//     {first_name: {type: String, required: true },
//     last_name: {type: String, required: true},
//     MeetupPoint: {type:String, required:true},
//     location: {
//         type: { type: String },
//         coordinates: [Number],
//       }

// }

 

