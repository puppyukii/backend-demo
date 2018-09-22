var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/', ensureAuthenticated, function(req,res){
  res.render('index');
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
