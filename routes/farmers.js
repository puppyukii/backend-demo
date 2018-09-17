var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Farmer =require('../models/farmer');

router.get('/', (req, res)=>{
  res.render('farmer');
});
router.post('/add', (req, res)=>{
  res.render('farmer');
});



module.exports = router;
