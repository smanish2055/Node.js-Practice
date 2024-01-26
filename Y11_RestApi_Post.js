// middleware -The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.
const express = require('express');
const fs = require('fs');

let app = express();
let movies = JSON.parse(fs.readFileSync('./Data/movies.json'));

app.use(express.json()); // this is middleware in express js.. by default express js dosenot add req.body to req object so this middlewear helps to add it.

// Custom middleware -
// const logger = function(req,res,next){
//     console.log('custom middleware called');
//     next();
// }
// app.use(logger);

app.use((req,res,next)=>{
req.requestedAt = new Date().toISOString();
next();
})

// morgan is Third party middleware
const morgan = require('morgan');
// this middleware login the information of request
app.use(morgan('dev'));
app.use(morgan('tiny'));


// post the json data  
app.post('/api/v1/movies', (req,res) =>{
    console.log(req.body);
    const newId = movies[movies.length-1].id + 1 ;

    const newMovie = Object.assign({id:newId}, req.body);

    movies.push(newMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies),(err) =>{
        res.status(201).json({
            status:"success",
            data:{
                movie:newMovie
            }
        })
    });
})

// handeling Route Parameters
app.get('/api/v1/movies/:id',(req,res) =>{
    const id = req.params.id * 1;
    // console.log(req.params);
    // console.log(id);
    // res.send("tested parameter");

    let movie = movies.find(el => el.id == id);

    if(!movie){
        res.status(404).json({
            status: "fail",
            message:"movie with id is not found"
        })
    }

    res.status(200).json({
        status:"success",
        requestedAt:req.requestedAt,
        data:{
            movie:movie
        }
    })

})


// put and patch 
app.patch('/api/v1/movies/:id',(req,res) =>{
    const id = req.params.id * 1;
    let movieTOUpdate = movies.find(el => el.id == id);
    if(!movieTOUpdate){
       return  res.status(404).json({
            status:"Fail",
            message:`No movie object with iD ${id} is found`
    })
}
    index = movies.indexOf(movieTOUpdate);
    // here Object.assign method copy data from req.body to movieToUpdate and update properties of movieToUpdate   which is similar to both object
    Object.assign(movieTOUpdate,req.body);
    movies[index] = movieTOUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies),(err) =>{
        res.status(200).json({
            status:"success",
            data:{
                movie:movieTOUpdate
            }
        })
})

})

// Delete operation
app.delete('/api/v1/movies/:id',(req,res) =>{
    const id = req.params.id * 1;
    let movieTODelete = movies.find(el => el.id == id);
    index = movies.indexOf(movieTODelete);
    if(!movieTODelete){
         res.status(404).json({
            status:"Fail",
            message:`No movie object with iD ${id} is found to delete`
    })
}

movies.splice(index,1); // 1 means delete and 0 means add and it delete the element which in is associated with index here.

fs.writeFile('./data/movies.json', JSON.stringify(movies),(err)=>{
    res.status(200).json({
        status:"sucess",
        data:{
            movie:null
        }
    })
})

})

app.listen(3000,()=>{
    console.log("server running in port 3000");
})