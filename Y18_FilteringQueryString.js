const express=require('express');
const app=express();
app.use(express.json());
const Movie = require('./Models/movieModel');


app.get('/api/v1/movies/', async (req,res) =>{
    try{

        // this will necessary for mongoose 6.0 or less
    //     const excludeFields = ['sort','page','limit','fields'];
    //     const queryObj = {...req.query}
    //    excludeFields.forEach((el)=>{
    //     delete queryObj[el]
    //    })
    //      const movies = await Movie.find(queryObj);
 
    // else this is enough to filter data
     // const movies = wait Movie.find(req.query)
         let movies1 = Movie.find(req.query);
        // const movies = Movie.find()

         //another way: 
        //  const movies= await Movie.find().where('duration').equals(req.query.duration).where('ratings').equals(req.query.ratings);  //here in place of equals we have other more builtin methods like gte(),lte() etc.

        //sorting the result using query string
        // http://127.0.0.1:8000/api/v1/movies/?sort=-releaseYear,ratings
        if(req.query.sort){
          const sortBy = req.query.sort.split(',').join(' ');
          query1=movies1.sort(sortBy);//when we sort result by two or more field then those filed we specify by space
          console.log(query1);
        }else{
          query=movies1.sort('-createsAt');
        }
        
// Limiting fields means showing data according query parameters
// http://127.0.0.1:8000/api/v1/movies/?fields=name,duration,price,ratings
        if(req.query.fields){
          const fields = req.query.fields.split(',').join('');
          query = query.select(fields);
        }

        // pagination
        // http://127.0.0.1:8000/api/v1/movies/?page=1&limit=3
        // idk why all these are not working
        const page = req.query.page*1 || 1;
        const limit = req.query.limit*1 || 10;
        const skip =(page-1)*limit;
        query = query.skip(skip).limit(limit);
        if(req.query.page){
          const moviesCount = Movie.countDocuments();
          if(skip >= moviesCount){
            throw new Error("this page is not found");
          }
        }


        const movies= await query;

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


   app.listen(8000,()=>{
    console.log("listening at 8000 port");
   })
//    "duration": 117,
// "ratings": 6.4,