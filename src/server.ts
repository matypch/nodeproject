import { createServer } from "http";
import { redirectionHandler, newUrlHandler, defaultHandler, notFoundHandler } from "./handler";
import { createServer as createHttpsServer } from "https";
import { readFileSync } from "fs";
import express, { Express } from "express";

const port = 5000;
const https_port = 5500;
const server = createServer(redirectionHandler);
/*** 
server.on("request", (req, res) => {
    if(req.url?.endsWith(".ico")){
        res.statusCode = 404;
        res.end();
    }
    else{
        handler(req, res);
    }
});***/

server.listen(port, () => console.log(`Server listening on port ${port}`));

const httpsConfig = {
    key: readFileSync("key.pem"),
    cert: readFileSync("cert.pem")
};
//uso de express
const expressApp = express();
expressApp.get("/favicon.ico", notFoundHandler);
expressApp.get("/newurl", newUrlHandler);
expressApp.get("*", defaultHandler);
const httpsServer = createHttpsServer(httpsConfig, expressApp);

//const httpsServer = createHttpsServer(httpsConfig, handler);
httpsServer.listen(https_port, () =>  console.log(`Server listening on port ${https_port}`));
//on(event, callback) registra un callback para un evento específico.)
//off(event, callback) elimina un callback para un evento específico.)
//once(event, callback) registra un callback para un evento específico que se ejecutará una sola vez.)

