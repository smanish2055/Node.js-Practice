const http = require('http');
const fs = require('fs');

const html =fs.readFileSync('./Template/index.html','utf-8')
const server = http.createServer((request,response) => {
    
    let path = request.url;
    if(path === '/' || path.toLocaleLowerCase()  ==='/home'){
        response.writeHead(200,{'Content-Type':'text/html',
        'my-header':'Hellow, world'
    })

        response.end(html.replace('{{p}}', 'you are in home page'));
    }else if (path.toLocaleLowerCase() === '/about'){
        response.writeHead(200,{'Content-Type':'text/html',
        'my-header':'Hellow, world'
    })
        response.end(html.replace('{{p}}', 'you are in About page'));
    }else if (path.toLocaleLowerCase() === '/contact'){
        response.writeHead(200,{'Content-Type':'text/html',
        'my-header':'Hellow, world'
    })
        response.end(html.replace('{{p}}', 'you are in contact page'));
    }else{
        response.writeHead(404,
    )
        response.end(html.replace('{{p}}', 'Error 404: page not found')); 
    }
});

server.listen(8000, '127.0.0.1', () =>{
    console.log("server has started");
})

