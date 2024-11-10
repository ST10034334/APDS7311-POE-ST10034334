// The IIE (2024) demonstrates the server.mjs file - Setting up the server. 
import http from "http";
import helmet from "helmet";
import express from "express";
import auth from "./routes/auth.mjs";
import pay from "./routes/pay.mjs";
import user from "./routes/user.mjs";
import cors from "cors";

console.log("Server Up and Running!");

//Defines the port number for the server.
const PORT = process.env.PORT || 8080; 

//Creates a new Express application.
const app = express(); 

//Uses CORS middleware to enable Cross-Origin Resource Sharing. (safely allows or restrict which websites can access your data).
app.use(cors());

//Uses Express JSON middleware to parse JSON request bodies.
app.use(express.json());


//Middleware to set custom CORS headers for all responses.
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); //Allows requests from any origin.
   res.setHeader('Access-Control-Allow-Headers', '*'); //Allows any headers in the request.
   res.setHeader('Access-Control-Allow-Methods', '*'); //Allows any HTTP methods.
   next(); //Passes control to the next piece of code.
});

//Sets the X-Frame-Options header to deny: This prevents web pages from being embedded in a frame.
//Zanini (2023) demonstrates how to use Helmet to set the X-Frame-Options header.
app.use(
   helmet.frameguard({
     action: "deny",
   })
 );

//Sets the CSP header directives: This controls what resources web pages can load.
//Zanini (2023) demonstrates how to use Helmet to set the CSP header.
app.use(
   helmet.contentSecurityPolicy({
     directives: {
       defaultSrc: ["'self'"],  //Allow resources from hosted domain.
       scriptSrc: ["'self'"],    //Allow scripts from hosted domain.
       styleSrc: ["'self'"],     //Allow styles from hosted domain.
     },
   })
 );

//Uses the imported router for handling routes under '/auth', '/pay', '/user'.
app.use('/auth', auth);
app.use('/pay', pay);
app.use('/user', user);

//Creates an HTTPS server with the defined options and the Express application.
let server = http.createServer(app);

console.log(PORT);

//Starts the server to listen for incoming connections on the specified port.
server.listen(PORT);


/* REFERENCE LIST:
The IIE. 2024. LAB GUIDE 2024 [APDS7311/w Learn]. The Independent Institute of Education:
Unpublished.    

Zanini, A. 2023. Using Helmet in Node.js to secure your application. LogRocket, 8 March 2023 (Version 1.0)
[Source code] https://blog.logrocket.com/using-helmet-node-js-secure-application/
(Accessed 5 October 2024).
*/