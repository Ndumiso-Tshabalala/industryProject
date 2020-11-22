const express = require('express');  
// const serveStatic = require('serve-static')
const path = require('path')
const request = require("request");
const fs = require('fs');
const xlsx = require("xlsx");

const multer = require('multer');
const uuid = require('uuid').v4;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Files = require('./models/Files');


mongoose.connect('mongodb+srv://admin:admin123@cluster0.4l1jt.mongodb.net/<dbname>?retryWrites=true&w=majority');

const app = express();    //initialise app as instance of express
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use('/',serveStatic(path.join(__dirname,'/dist')))
// app.get(/.*/, function(req, res){
//     res.sendFile(__dirname + "/dist/index.html");
// });

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
    
//collecting user info
app.get('/user',(req, res, next) => {
let token = req.headers.token; //token
//verify token before collecting information
jwt.verify(token, 'secretkey',(err,decoded) => {
    if(err) return res.status(401).json({                //valid user
        //send back
        title: 'unauthorized'
    })
    //valid token
    User.findOne({_id: decoded.userId}, (err,user)=>{       //passing to front end
        if(err)return console.log(err)
        return res.status(200).json({
            title: 'user collected',
            user: {
                email: user.email,
                name: user.name
            }

        })
    })
})
})
//using multer
//working directly with mongoose
const connection = mongoose.connection;
connection.on('error', console.log);

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, 'uploads');
    },                                                                                  //uploading file along with original extention //storing to server and paths to database
    filename: (req, file, cb) => {
        // const{ originalname } = file;
        const ext = path.extname(file.originalname);
        const id = uuid();
        const filePath = `files/${id}${ext}`;
        // cb(null, `${uuid()}-${originalname}`);  //using uuid to create unique string, to avoid files being overwritten
        Files.create({ filePath })
            .then(()=> {
                cb(null,filePath);
            });   
            
      
    }
})

const upload = multer({storage});

 app.post('/upload', upload.single('file') ,(req,res)=> {
        return res.json({status: 'OK'});
       
        
     });


//read excel file




const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log('server running on port ' + port);
})