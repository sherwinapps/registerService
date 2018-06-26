const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Register = require('../models/register');
const os = require('os');

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));


router.post('/register/adduser',(req, res, next) => {
    var expdate = new Date();

    
    let registrant = new Register({
        username : req.body.username,
        password : req.body.password,
        registerdate : registerdate = new Date(),
        passwordexpdate : expdate.setDate(expdate.getDate() + 90),
        hostname : os.hostname()	
    });

    Register.addUser(registrant, {}, (err, register) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
          } else {
            res.json({success: true, msg:'User registered'});
//            res.json({registrant});
          }
    })
});

module.exports = router;