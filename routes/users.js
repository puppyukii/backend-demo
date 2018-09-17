var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User =require('../models/user');

//Register
router.get('/register',function(req, res){
  res.render('register');
});

//login
router.get('/login',function(req, res){
  res.render('login');
});

//Register
router.post('/register',function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.Password;
  var password2 = req.body.Password2;
  var address = req.body.address;
  var phonenumber = req.body.phonenumber;
  var ic = req.body.ic;



  //validation
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('mail','Email is required').notEmpty();
  req.checkBody('mail','Email not valid').isEmail();
  req.checkBody('username','Username is required').notEmpty();
  req.checkBody('Password','Password is required').notEmpty();
  req.checkBody('Password2','Passwords do not match').equals(req.body.Password2);
  req.checkBody('address','address is required').notEmpty();
  req.checkBody('phonenumber','phonenumber is required').notEmpty();
  req.checkBody('ic','ic is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('register',{
      errors:errors
    });
  }else{
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password:password,
      address:address,
      phonenumber:phonenumber,
      ic:ic
    });
    User.creatUser(newUser,function(err,user){
      if(err)throw err;
      console.log(user);
    });

    req.flash('success_msg','you are registered and can now login');

    res.redirect('/users/login');
  }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username,function(err,user){
      if(err)throw err;
      if(!user){
        return done (null,false,{message: 'Unknown User'});
      }

      User.comparePassword(password, user.password,function(err, isMatch){
        if(err)throw err;
        if(isMatch){
          return done (null,user);
        }else {
          return done (null,false,{message: 'Invalid password'});
        }
      });

    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserByUsername(id, function(err, user) {
      done(err, user);
    });
  });

  router.post('/login',
  passport.authenticate('local', {successRedirect:'/',failureRedirect:'/users/login',failureFlash:true}),
  function(req, res) {
    res.redirect('/');
  });

  router.get('/logout',function(req,res,next){
    req.logout();

    req.flash('success_msg','you are logged out');

    req.redirect('/users/login');
  });

  module.exports = router;
