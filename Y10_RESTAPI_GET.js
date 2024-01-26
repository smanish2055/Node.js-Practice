const express = require('express');
const fs = require('fs');

let app = express();

let movies = JSON.parse(fs.readFileSync('./Data/movies.json'));

// GET - api/movies  .... basically we are creating api ie /api/v1/movies  
app.get('/api/v1/movies',(req,res) =>{
    res.status(200).json({
        status:"success",
        count:movies.length,
        data:{ //this is enveloping means we are wrapping data inside another object
            movies:movies
        }
    })
})



app.listen(3000,()=>{
    console.log("server running in port 3000");
})