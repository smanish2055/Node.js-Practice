const fs = require("fs");
fs.readFile('./File/start.txt', 'utf-8', (error1, data1) => {
    console.log(data1)
    fs.readFile(`./File/${data1}.txt`, 'utf-8', (error2, data2) => {
        console.log(data2);
        fs.readFile('./File/append.txt', 'utf-8', (error3, data3) => {
            console.log(data3);
            fs.writeFile('./File/output.txt', `${data2}\n\n${data3}\n\nDate created ${new Date()}`, () => {
                console.log('File writen successfully');
            });
        })
    })
})

console.log("Reading File...");

// callback heal