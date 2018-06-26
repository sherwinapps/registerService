var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const publicIp = require('public-ip');
const http = require('http');

// Register Collection 
var RegisterSchema = mongoose.Schema({
		username : {
		type: String,
		index: true,
		required: true,
		uniqueItems: true
	},
	password : {
		type: String
	},
	registerdate: {
		type: String
	},
	passwordexpdate: {
		type: Date
    },
    publicip : {
        type: String
    },
    privateip : {
        type: String
    },
    hostname : {
        type: String
    }
});

var Register = module.exports = mongoose.model('Register', RegisterSchema);

//Register User function
module.exports.addUser = function(registrant, options, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(registrant.password, salt, (err, hash) => {
        if(err) throw err;
        registrant.password = hash;
        registrant.save(callback);
      });
    });
    var query = {username : registrant.username};

    publicIp.v4().then(ip =>{
       registrant.publicip = ip;
       registrant.save();
    })

    var options = {
        host: 'www.google.com.ph',
      };
    
    var r1 = http.get(options);
    r1.once('response', (r1) => {
      registrant.privateip = r1.socket.localAddress;
      registrant.save();
    });

    Register.findOneAndUpdate(query, registrant, options);
  }
