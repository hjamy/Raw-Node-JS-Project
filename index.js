//dependencies
const http = require('http');

// app object - module scuffholding
const app = {};

//configuration
app.config = {
    port: 3000,
};

//server
app.createServer = () =>{
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () =>{
        console.log(`listening to port ${app.config.port}`);
    })
}

//Handle Request, Response
app.handleReqRes = (req, res) =>{
    res.end('Hello World!!!!');
}

//Start the server
app.createServer();