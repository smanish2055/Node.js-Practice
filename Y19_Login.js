const mongoose = require('mongoose');
const express=require('express');
const app=express();
app.use(express.json());
const User = require('./Modules/userModel.js');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');
dotenv.config({path: './config.env'});

// inserting data in collection
app.post('/api/v1/signup', async (req,res) =>{
    // console.log(process.env.SECRET_STR)
 try{
    const newUser = await User.create(req.body);
    const token = jwt.sign({id:newUser._id},process.env.SECRET_STR,{
        expiresIn:process.env.LOGIN_EXPIRES //we are getting these value from environment variable
    })
// console.log(movie._id);
    res.status(201).json({
        status:'success',
        token,  //you can write token:token also 
        data:{
            user:newUser
        }
    })
 }
 catch(err){
  res.status(400).json({
    status:'fail',
    message:err.message
  })
 }
})

app.post('/api/v1/login', async (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        console.log("Please enter email Id and Password") ;
    }
const user = await User.findOne({email}).select('+password');


console.log(password)

const token = jwt.sign({id:user._id},process.env.SECRET_STR,{
    expiresIn:process.env.LOGIN_EXPIRES //we are getting these value from environment variable
})

if(!user || !(await user.comparePasswordInDb(password,user.password))){
    console.log("incorrect email Id and Password") ;
    res.status(400).json({message:"Incorrect email Id and Password"});
}
else{
res.status(200).json({
    status:'success',
    token,
    user
})
}
})

app.listen(8000,()=>{
    console.log("Server has started at port 8000");
})