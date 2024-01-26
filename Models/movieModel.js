const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/School',{
    useNewUrlParser: true
}).then((conn) =>{
    
    console.log("Db Connection successful from Models/movieModel.js folder");
}).catch((error) =>{
    console.log(error);
})

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required field'],
        unique:true,
        trim:true
    },
    description:{
    type:String,
    required:[true,'Name is required field'],
    trim: true
},
    duration: {
        type:Number,
        required:[true,'Duration is required field']
    },
    ratings:{
        type:Number,
    },
    totalRating:{
        type:Number
    },
    releaseYear:{
        type:Number,
        required:[true,'Duration is required field']
    },
    releaseDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    genres:{
        type:[String],
        required:[true,'Duration is required field']
    },
    directors:{
        type:[String],
        required:[true,'Duration is required field']
    },
    coverImage:{
        type:[String],
        required:[true,'Duration is required field']
    },
    actors:{
        type:[String],
        required:[true,'Duration is required field']
    },
    price:{
        type:Number,
        required:[true,'Duration is required field']
    }
},{
    toJSON:{virtual:true},
    toObject:{virtual:true}
});

movieSchema.virtual('durationInHours').get(function(){
    return this.duration/60;
})

const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;