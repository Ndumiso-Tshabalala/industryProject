const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const cors = require('cors');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
//sending data to the back end to sign up the user
 app.post('/signup', (req,res,next)=> {
    //  console.log(req.body.email)
         const newUser = new User({
         email: req.body.email,
         name: req.body.name,
         password: bcrypt.hashSync(req.body.password,10)
         

     })
     console.log(newUser);
 })

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})