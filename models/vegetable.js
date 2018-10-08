var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// user Schema
var VegeSchema = mongoose.Schema({
  vegetablename:{
    type:String,
    index:true
  },
  Seller : [{

    id      : {
      type  : String
    },
    name    : {
      type  : String
    },
    address : {
      type  : String
    },
    instock : {
      type  : Boolean
    },
    deliverable : {
      type : Boolean
    }
  }
]
});

var Vege = module.exports = mongoose.model('Vege', VegeSchema);

module.exports.addVeg =function(newVeg,callback){
  newVeg.save(callback);
}
