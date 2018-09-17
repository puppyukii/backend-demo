var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// user Schema
var farmerSchema = mongoose.Schema({
  vegetableName:{
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

var Farmer = module.exports = mongoose.model('Farmer',farmerSchema);

module.exports.creatUser =function(newUser,callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByFarmername = function(farmername, callback){
  var query = {farmername:farmername};
  User.findOne(query,callback);
}

module.exports.getUserById = function(id,callback){
  User.findById(id,callback);
}

module.exports.comparePassword = function(candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword, hash, function(err,isMatch) {
    if(err)throw err;
    callback(null,isMatch);
  });
}
