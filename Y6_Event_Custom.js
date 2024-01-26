const http = require('http');

const server = http.createServer();
//here request is a event and on is a eventListener
server.on('request' , (req,res) =>{
    res.end("Subscribe Javascript");
}).listen(8000);





// costum event
const user = require('./Modules/user');

let myEmitter = new user();

myEmitter.on('userCreated', (id, name) => {
    console.log(`A new user ${name} with ID ${id} is created!`)
})

myEmitter.on('userCreated', (id, name) => {
    console.log(`A new user ${name} with ID ${id} is added to database!`)
})

myEmitter.emit('userCreated', 101, 'John');
