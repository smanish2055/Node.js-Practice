const express = require('express');
let app = express();
  app.get('/', (req,res) =>{
    res.status(200).send("<h4>i m express js program</h4>");
    // if we eant to send json response then send method doesnot work for that however there is json method
    // res.status(200).json({massage:'hello' , status:200});
  })


  app.post('/', () =>{
  })

app.listen(8000,() =>{
    console.log("server started at 8000 port ");
})