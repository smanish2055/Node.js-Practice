const express=require('express');
const app=express();
app.use(express.json());
const Movie = require('./Models/movieModel');

// inserting data in collection
app.post('/api/v1/movies', async (req,res) =>{
 try{
    const movie = await Movie.create(req.body);
// console.log(movie._id);
    res.status(201).json({
        status:'success',
        data:{
            movie:movie
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

// fetching all data from collection
app.get('/api/v1/movies', async (req,res) =>{
    try{
         const movies = await Movie.find();
         res.status(201).json({
           status:'success',
           length:movies.length,
           data:{
               movies:movies
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

// fetching all data from collection using id as query parameter
   app.get('/api/v1/movies/:id', async (req,res) =>{
    try{
        // note here the find() used is not a js find() it is actually mongodb method which helps to fetch the data from collection

        //  const movies = await Movie.find();
        const movie = await Movie.find({_id:req.params.id});
    // const movie = await Movie.findById(req.params.id)
         res.status(201).json({
           status:'success',
           data:{
               movie:movie
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

// update in collection data
   app.patch('/api/v1/movies/:id', async (req,res) =>{
    try{
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        
         res.status(200).json({
           status:'success',
           data:{
            updateMovie:updateMovie
           }
       })
    }
    catch(err){
     res.status(404).json({
       status:'fail',
       message:err.message
     })
    }
   })

// Delete from collection
   app.delete('/api/v1/movies/:id', async (req,res) =>{
    try{
        const deleteMovie = await Movie.findByIdAndDelete(req.params.id); //these all method are provided my mongoose
        
         res.status(204).json({
           status:'success',
           data:null
       })
    }
    catch(err){
     res.status(404).json({
       status:'fail',
       message:err.message
     })
    }
   })


app.listen(8000,()=>{
    console.log("server started at 8000 port ");
})