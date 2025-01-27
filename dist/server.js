"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const handler_1 = require("./handler");
const https_1 = require("https");
const fs_1 = require("fs");
const express_1 = __importDefault(require("express"));
const port = 5000;
const https_port = 5500;
const server = (0, http_1.createServer)(handler_1.redirectionHandler);
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
    key: (0, fs_1.readFileSync)("key.pem"),
    cert: (0, fs_1.readFileSync)("cert.pem")
};
//uso de express
const expressApp = (0, express_1.default)();
expressApp.get("/favicon.ico", handler_1.notFoundHandler);
expressApp.get("/newurl", handler_1.newUrlHandler);
expressApp.get("*", handler_1.defaultHandler);
const httpsServer = (0, https_1.createServer)(httpsConfig, expressApp);
//const httpsServer = createHttpsServer(httpsConfig, handler);
httpsServer.listen(https_port, () => console.log(`Server listening on port ${https_port}`));
//on(event, callback) registra un callback para un evento específico.)
//off(event, callback) elimina un callback para un evento específico.)
//once(event, callback) registra un callback para un evento específico que se ejecutará una sola vez.)
