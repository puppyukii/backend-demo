var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Vege =require('../models/vegetable');
var Farmer =require('../models/farmer');

router.get('/', (req, res)=>{
  res.render('farmer', {user : req.farmer});
});

router.post('/addVeg', (req, res)=>{
  var Veg_Name = req.body.veg_name;
  var Weight = req.body.weight;
  var Price = req.body.price;

  var newVeg = new Vege();

  newVeg.vegetablename = Veg_Name;
  newVeg.weight = Weight;
  newVeg.price = Price;

  Vege.addVeg(newVeg, (err, vegetable)=>{
    if(err) throw err;
  })

  req.flash('success_msg', 'vegetable has been added');
  res.redirect('/farmers/');
});

router.get('/newFarmer', (req, res)=>{
  res.render('farmerRegister');
})

router.post('/newFarmer', (req, res)=>{
  var fullname = req.body.fullname;
  var mail = req.body.mail;
  var password = req.body.password;
  var password2 = req.body.password2;
  var address = req.body.address;
  var phonenumber = req.body.phonenumber;


  req.checkBody('fullname', 'Full name is required').notEmpty();
  req.checkBody('mail', 'Email is required').notEmpty();
  req.checkBody('mail', 'Email is Invalid').isEmail();
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('phonenumber', 'Contact number is required').notEmpty();
  req.checkBody('password', 'Password is Required').notEmpty();
  req.checkBody('password2', 'Password is Required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.render('farmerRegister', {
      errors : errors
    })
  }
  else {
    Farmer.findOne({'mail' : mail}, (err, farmer)=>{
      if(err) throw err;
      if(farmer){
        req.flash('error_msg', 'Some already joined using this mail address.');
        res.redirect('/farmers/newFarmer');
      }
      else {
        var newFarmer = new Farmer();

        newFarmer.fullname = fullname;
        newFarmer.mail = mail;
        newFarmer.password = password;
        newFarmer.address = address;
        newFarmer.phonenumber = phonenumber;

        Farmer.AddFarmer(newFarmer, (err, result) => {
          if(err) throw err;
        });

        req.flash('success_msg', 'Congratualtions !!! you have joined with Angaadi');
        res.redirect('/farmers/loginFarmer');
      }
    })
  }
});

router.get('/loginFarmer', (req, res)=>{
  res.render('farmerLogin');
});


passport.serializeUser(function(farmer, done) {
  done(null, farmer.id);
});

passport.deserializeUser(function(id, done) {
  Farmer.getFarmerById(id, function(err, farmer) {
    done(err, farmer);
  });
});

passport.use(new LocalStrategy(
  (mail, password, done)=>{
    Farmer.getFarmerbyMail(mail, (err, farmer)=>{
      if(err) throw err;
      if(!farmer){
        return done(null, false, {message : 'Unknown Farmer ID'});
      }
      Farmer.comparePassword(password, farmer.password, (err, isMatch)=>{
        if(err) throw err;
        if(isMatch){
          return done(null, farmer);
        }
        else {
          return done(null, false, {message : 'Wrong Password'});
        }
      })
    })
  }));

  router.post('/vallogfarmer',
  passport.authenticate('local', {successRedirect: '/farmers/', failureRedirect: '/farmers/loginFarmer', failureFlash: true}),
  (req, res)=>{
    res.redirect('/farmers/loginFarmer');
  });

  module.exports = router;
