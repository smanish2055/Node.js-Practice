// console.log("hello node js");
// here readline is a module
const readline = require('readline');
const rl = readline.createInterface(
    {
        input : process.stdin,
        output: process.stdout
    }
);
rl.question("please enter your name: ", (name)=>{
    console.log("you entered: " + name );
    rl.close();

})

rl.on('close', ()=>{
    console.log("interface is closed");
    process.exit(0);
})

