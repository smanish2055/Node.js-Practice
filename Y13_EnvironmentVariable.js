const dotenv= require('dotenv');
dotenv.config({path: './config.env'});
const express = require('express');
let app = express();


// console.log(app.get('env'));


console.log(process.env);//this shows the environment variable which is present in the process module and we don't need to import this module


// we can set enviroment variable using Set keyword in terminal and assign its variable
port=process.env.PORT || 3000 ; //if environment variable is not set then by default port will assign as 3000
app.listen(port,()=>{
    console.log(`server listening in ${port} port`);
})