const express = require('express');
let app = express();

app.use(express.static('./Public')) // this middleware is responsible to render the static file 

app.listen(8000,()=>{
    console.log("server listening in 8000 port");
})