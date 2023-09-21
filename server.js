const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path: '../Server/config.env'});

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(require('../Router/auth'));

// const middleware = (req,res,next) => {
//     console.log('Middleware Running...');
//     next();
// }



// const details = [];

// app.post('/signup',function(req,res){
//     const cred = {
//         email: req.body.name,
//         password: req.body.password
//     }

//     const UserList = User.findOne({email: req.body.email});

//     if(!UserList){
//         res.status(201).send({message: "User saved successfully..."});
//         const user = new User({
//             email: req.body.email,
//             password: req.body.password
//         })
//         user.save();
//     }
//     else{
//         res.status(422).send({error: "Account with that email addresses already exists..."});
//     }


//     details.push(cred);
// });

// app.post('/signin',function(req,res){

//     const existingUser = User.findOne({email: req.body.email});
//     if(existingUser){
//         res.status(201).send({signin: "Signed In successfully..."});
//     } else{
//         res.status(422).send({signin_error: "Incorrect email or password..."});
//     }

// })

app.listen(PORT,function(){
    console.log(`Running on PORT ${PORT}...`);
})