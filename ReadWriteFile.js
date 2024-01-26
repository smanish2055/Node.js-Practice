const fs = require("fs");
//fs= file system
let textIn = fs.readFileSync('./File/input.txt','utf-8');
console.log(textIn);

let content = ` i m writing something from input file to revise my concept ie ${textIn}. \n\n Date : ${new Date()} `;
console.log(content)
fs.writeFileSync('./File/output.txt', content);