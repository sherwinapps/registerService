const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to Mongo DB 
mongoose.connect ('mongodb://localhost/EmployeeCredential',(err)=> {
    if (err) throw err;
    console.log('MongoDB Connected ...')
});
const  db = mongoose.connection;

const app = express();

// Models 
const Register = require('./models/register');

const routes = require ('./routes/index');
const api = require ('./routes/api');

app.use('/', routes);
app.use('/api', api);

app.listen('3003', () => {
    console.log('Server started on port 3003 ...')
});



