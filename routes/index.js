var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Get Homepage
router.get('/',ensureAuthenticated,function(req,res){
  res.render('index');
});

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
  } else {
    // req.flash('error_mgs','you are not logged in');
    res.redirect('/users/login')

  }
}
module.exports = router;
