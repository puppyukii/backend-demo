var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', function(req,res){
  res.render('index');
});

router.get('/menu', function(req,res){
  res.render('menu');
});

router.get('/about', function(req,res){
  res.render('about');
});

router.get('/contact', function(req,res){
  res.render('contact');
});

router.get('/gallery', function(req,res){
  res.render('gallery');
});

router.get('/admin', function(req,res){
  res.render('admin');
});

function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_mgs','you are not logged in');
    res.redirect('/farmers/loginFarmer')

  }
}
module.exports = router;
