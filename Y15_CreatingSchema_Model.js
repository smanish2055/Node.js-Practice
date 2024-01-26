const express=require('express');
const app=express();
const mongoose = require('mongoose');


    mongoose.connect('mongodb://127.0.0.1:27017/School',{
    useNewUrlParser: true
}).then((conn) =>{
    console.log(conn);
    
    console.log("Db Connection successful");
}).catch((error) =>{
    console.log(error);
})



// creating Schema
const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required field'],
        unique:true
    },
    description:String,
    duration:{
        type:Number,
        required:[true,'Duration is required field']
    },
    ratings:{
        type:Number,
        default:1.0
    },
});

// creating model name as Movie
// model name must start with capital letter
// for this Movie model it create plural Movies Collection in database School
const Movie = mongoose.model('Movie',movieSchema);

// creating documents in mongodb database from Model

const testMovie = new Movie({
    name:"Time machine",
    description:"Action packed movie string nknsnkf nkan ,mnf",
    duration: 129,
    // rating:4.5
})

testMovie.save().then(doc=>{
    console.log(doc);
}).catch(err =>{
    console.log(err)
})


app.listen(8000,()=>{
    console.log("server started at 8000 port ");
})