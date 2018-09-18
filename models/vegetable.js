var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// user Schema
var VegeSchema = mongoose.Schema({
  vegetablename:{
    type:String,
    index:true
  },
  weight:{
    type:String
  },
  price:{
    type:String
  }

});

var Vege = module.exports = mongoose.model('Vege', VegeSchema);

module.exports.addVeg =function(newVeg,callback){
  newVeg.save(callback);
}
