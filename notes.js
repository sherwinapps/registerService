const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });

  const User = module.exports = mongoose.model('User', UserSchema);


  router.post('/register', (req, res, next) => {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
  
    User.addUser(newUser, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to register user'});
      } else {
        res.json({success: true, msg:'User registered'});
      }
    });
  });

  module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }