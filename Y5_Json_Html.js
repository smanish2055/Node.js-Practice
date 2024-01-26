const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceHtml = require("./Modules/replaceHtml");

const html = fs.readFileSync("./Template/index.html", "utf-8");

// JSON.parse() method change json data into js object
let products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
let productListHtml = fs.readFileSync("./Template/product-list.html", "utf-8");
let productDetailHtml = fs.readFileSync(
  "./Template/product-details.html",
  "utf-8"
);
// basically what is happening here is the function is taking two parameteres one for the template we are going to change its element  and another is the data by which templete data will change.
// function replaceHtml(template, product){
//     let output = template.replace('{{%IMAGE%}}', product.productImage);
//     output = output.replace('{{%NAME%}}', product.name);
//     output = output.replace('{{%MODELNAME%}}', product.modeName);
//     output = output.replace('{{%MODELNO%}}', product.modelNumber);
//     output = output.replace('{{%SIZE%}}', product.size);
//     output = output.replace('{{%CAMERA%}}', product.camera);
//     output = output.replace('{{%PRICE%}}', product.price);
//     output = output.replace('{{%COLOR%}}', product.color);
//     output = output.replace('{{%ID%}}', product.id);
//     output = output.replace('{{%ROM%}}', product.ROM);
//     output = output.replace('{{%DESC%}}', product.Description);

//     return output;
// }
// STEP 1: CREATE A SERVER
const server = http.createServer((request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);
  let x = url.parse(request.url, true);
  console.log(x);
  //let path = request.url;

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hellow, world",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in Home page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hellow, world",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in About page"));
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hellow, world",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in Contact page"));
  } else if (path.toLocaleLowerCase() === "/products") {
    if (!query.id) {
      let productHtmlArray = products.map((prod) => {
        return replaceHtml(productListHtml, prod);
      });
      let productResponseHtml = html.replace(
        "{{%CONTENT%}}",
        productHtmlArray.join(",")
      );

      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(productResponseHtml);
    } else {
      let prod = products[query.id];
      let productDetailResponseHtml = replaceHtml(productDetailHtml, prod);
      response.end(html.replace("{{%CONTENT%}}", productDetailResponseHtml));
    }
  } else {
    response.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hellow, world",
    });
    response.end(html.replace("{{%CONTENT%}}", "Error 404: Page not found!"));
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server has started");
});
