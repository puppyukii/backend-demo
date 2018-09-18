var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// user Schema
var FarmerSchema = mongoose.Schema({
  fullname:{
    type:String
  },
  mail:{
    type:String
  },
  address : {
    type:String
  },
  phonenumber : {
    type:String
  },
  password : {
    type:String
  }
});

var Farmer = module.exports = mongoose.model('Farmer', FarmerSchema);

module.exports.AddFarmer = function(newFarmer,callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newFarmer.password, salt, (err, hash)=>{
      newFarmer.password = hash;
      newFarmer.save(callback);
    });
  });
}

module.exports.getFarmerbyMail = (mail, callback)=>{
  var query = { 'mail' : mail};
  Farmer.findOne(query, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
  bcrypt.compare(candidatePassword , hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null, isMatch);
  });
}
