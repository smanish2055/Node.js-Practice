// this  is a exercise where we are importing data from json file and inserting in mongodb database with  collection name movies 

//run this program by node Y17_Import_Dev_Data.js import

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('./Models/movieModel.js');

dotenv.config({path:'./config.env'});

const movies = JSON.parse(fs.readFileSync('./data/moviesMongodb.json','utf-8'));

// Delete existing movie documents from collection
const deleteMovies = async () =>{
try{
    await Movie.deleteMany();
    console.log("data successfully deleted");
}
catch{
    console.log(err.message);
}
process.exit();
}  

// import movies data to mongodb collection
const importMovies = async () =>{
    try{
        await Movie.create(movies);
        console.log("data successfully imported");
    }
    catch(err){
        console.log(err.message);
    }
    process.exit();
    }

    // console.log(process.argv);

    if(process.argv[2]=== 'import'){
        importMovies();
    }
    if(process.argv[2]=== 'delete'){
        deleteMovies();
    }