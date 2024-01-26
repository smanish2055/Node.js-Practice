/*LECTURE 29: CODE EXAMPLE**************
EVENT LOOP IN PRACTICE
***************************************/
const fs = require('fs');

// this is top level code and firstly executed in main thread than other
console.log('Program has started')

//STORED - 2ND PHASE
fs.readFile('./File/input.txt', () => {
    console.log('File read complete!');

    //STORED IN - 1ST PHASE
    setTimeout(() => {
        console.log('Timer callback executed')
    }, 0);

    //STORED IN - 3RD PHASE
    setImmediate(() => {console.log('SetImmediate callback executed')});

    // nextTick queue is not part of event loop phase executed after current phase finish its execution.
    process.nextTick(() => {console.log('Process.nextTick callback executed')})
})
// this is also top level code and firstly executed in main thread
console.log('Program has completed')