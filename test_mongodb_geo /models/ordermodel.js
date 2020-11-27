const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema( {
  userid: {type: String, unique: true},
  slug: {type: String, unique:true},
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
  orderDetails: [{
    orderUserId: String,
    food: [String]
  }]

} )

orderSchema.index({ "location": "2dsphere" });

const orderModel = mongoose.model('Order', orderSchema )

module.exports= orderModel
//     {first_name: {type: String, required: true },
//     last_name: {type: String, required: true},
//     MeetupPoint: {type:String, required:true},
//     location: {
//         type: { type: String },
//         coordinates: [Number],
//       }

// }

 

