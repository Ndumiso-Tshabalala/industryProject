const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');


mongoose.connect('mongodb+srv://admin:admin123@cluster0.4l1jt.mongodb.net/<dbname>?retryWrites=true&w=majority');

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
     //save new user
     newUser.save(err=>{
         if(err){
             return res.status(400).json({      //called when user already exists with pre-existing email
                title: 'error',
                error: 'email in use'
             })
         }
         return res.status(200).json({
             title: 'signup success'
         })
     })
 
    })

    //directs to log in
    app.post('/login', (req,res,next)=>{
        //checks email correspondence
       User.findOne({ email: req.body.email}, (err, user) => {
        if(err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if(!user){
            return res.status(401).json({
                title: 'user not found',
                error: 'invalid credentials'
            })
        }
        
        //check for incorrect password
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'login failed',
                error: 'invalid credentials'
            })
        }
        //if all credentials are correct, create token and send to front end
        //JSON WEB TOKENS
        let token = jwt.sign({userId: user._id}, 'secretkey') //create key to keep private
        return res.status(200).json({
            title: 'login success',
            token: token
        })
      })

    })
    


const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})