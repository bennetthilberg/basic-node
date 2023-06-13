const http = require('http');
const fs = require('fs/promises');

async function getPage(pageWanted){
    let out = 'page not found';
    try {
        if(pageWanted === 'index'){
            out = await fs.readFile('./index.html', 'utf8');
        }
        else if(pageWanted === 'about'){
            out = await fs.readFile('./about.html', 'utf8');
        }
        else if(pageWanted === 'contact'){
            out = await fs.readFile('./contact.html', 'utf8');
        }
        else{
            out = await fs.readFile('./404.html', 'utf8');
        }
    } catch (error) {
        console.log(error);
    }
    return out;
}

http.createServer(async (req, res) => {
    try{
        if(req.url === '/'){
            const index = await getPage('index');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(index);
        }
        else if(req.url === '/about'){
            const about = await getPage('about');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(about);
        }
        else if(req.url === '/contact'){
            const contact = await getPage('contact');
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(contact);
        }
        else{
            const nF = await getPage('dickandballs');
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(nF);
        }    
    }
    catch{
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('internal server error');
    }
    }).listen(8080);
