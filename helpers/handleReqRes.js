// Dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../route');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');
// const {sampleHandler} = require('../handlers/routeHandlers/sampleHandler');

const handler = {};

handler.handleReqRes = (req, res) =>{
    // handle request
    // get the url and parse it
    
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const queryStringObject = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headersObject = req.headers;

    console.log(trimmedPath);

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath, 
        queryStringObject,
        method,
        headersObject
    }

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath]:notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        // return the final response
        res.writeHead(statusCode);
        res.end(payloadString);
    });

    req.on('data', (buffer) =>{
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        res.end('Hello World');
    });
}

module.exports = handler;