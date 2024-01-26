
const http = require('http');
const server = http.createServer();
//SOLUTION 1: WITHOUT READABLE OR WRITABLE STREAM
// server.on('request', (req, res) =>{
//     fs.readFile('./Files/large-file.txt', (err, data) =>{
//         if(err){
//             res.end('Something went wrong!');
//             return;
//         }
//         res.end(data);
//     })
// })

//SOLUTION 2: USING READABLE & WRITABLE STREAM

// here data from large-file is read stream by stream means packet by packet so that it avoid loading of the file . here we are using event listener .
// here in this porgram request, data , end all are the event inside on method.

// server.on('request', (req, res) =>{
//     let rs = fs.createReadStream('./Files/large-file.txt');

//     rs.on('data', (chunk) => {
//         res.write(chunk)
//     })
// rs.on('end', () =>{
//     res.end();
// })

//     rs.on('error', (error) => {
//         res.end(error.message);
//     })
// })


// solution : 3 using pipe method
server.on('request' , (req, res) =>{
    let rs = fs.createReadStream('./Files/large-file.txt');
    rs.pipe(res); // this pipe methode is same like above but it provide solution for backpressure(ie reading has 5mbps and writing happening in 2mbps )
    // readableSourse.pipe(writableDestination)
})