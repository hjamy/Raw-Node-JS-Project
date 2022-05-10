//dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');

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
app.handleReqRes = handleReqRes;

//Start the server
app.createServer();