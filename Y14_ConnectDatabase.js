const express=require('express');
const app=express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


// mongoose.connect(process.env.CONN_STR,{  // this is using environment variable configuration
    mongoose.connect('mongodb://127.0.0.1:27017/School',{
    useNewUrlParser: true
}).then((conn) =>{
    console.log(conn);
    
    console.log("Db Connection successful");
}).catch((error) =>{
    console.log(error);
})

app.listen(8000,()=>{
    console.log("server started at 8000 port ");
})