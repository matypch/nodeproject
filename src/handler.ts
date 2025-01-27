//esta seccion es usando express
import { IncomingMessage, request, ServerResponse } from "http";
import { URL } from "url";
import { TLSSocket } from "tls";

export const isHttps = (req: IncomingMessage): boolean => {
    return req.socket instanceof TLSSocket && req.socket.encrypted;
}
export const redirectionHandler = (req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(302, {
        "Location": "https://localhost:5500"
    });
    resp.end();
}

export const notFoundHandler = (req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(404, "Not Found");
    resp.end();
}
export const newUrlHandler = (req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(200, "OK");
    resp.write("Hello, New URL");
    resp.end();
}
export const defaultHandler = (req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(200, "OK");
    const protocol = isHttps(req) ? "https" : "http";
    const parsedURL = 
        new URL(req.url ?? "", `${ protocol }://${req.headers.host}`);
    if(!parsedURL.searchParams.has("keyword")){
        resp.write(`Hello, ${protocol.toUpperCase()}`);
    }else {
        resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
    }
    resp.end();
}


/***
 * Esta seccion es usando tts sin express y sin middleware
import { IncomingMessage, request, ServerResponse } from "http";
import { URL } from "url";
import { TLSSocket } from "tls";

export const isHttps = (req: IncomingMessage): boolean => {
    return req.socket instanceof TLSSocket && req.socket.encrypted;
}
export const redirectionHandler = (req: IncomingMessage, resp: ServerResponse) => {
    resp.writeHead(302, {
        "Location": "https://localhost:5500"
    });
    resp.end();
}
export const handler = (req: IncomingMessage, resp: ServerResponse) => {
    const protocol = isHttps(req) ? "https" : "http";
    const parsedURL = 
        new URL(req.url ?? "", `${ protocol }://${req.headers.host}`);
    if(req.method === "GET" && parsedURL.pathname === "/favicon.ico"){
        resp.writeHead(404,"not found");
        resp.end();
        return;
    }else {
        resp.writeHead(200, "OK");
        if(!parsedURL.searchParams.has("keyword")){
            resp.write(`Hello, ${protocol.toUpperCase()}`);
        } else {
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        resp.end();
        return;
    }
};

***/





/*** import { IncomingMessage, ServerResponse } from "http";
import { endPromise, writePromise } from "./promises";
import { Worker } from "worker_threads";
const total = 2_000_000_000;
const iterations = 5;
let shared_counter = 0;
export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    const request = shared_counter++;
   
    const worker = new Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations,
            total,
            request
        }
    });
    worker.on("message", async (iter: number) => {
        const msg = `Request: ${request}, Iteration: ${(iter)}`;
        console.log(msg);
        await writePromise.bind(res)(msg + "\n");
    });
    worker.on("exit", async (code: number) => {
        if (code == 0) {
            await endPromise.bind(res)("Done");
        } else {
            res.statusCode = 500;
            await res.end();
        }
    });
    worker.on("error", async (err) => {
        console.log(err)
        res.statusCode = 500;
        await res.end();           
    });
};
***/
/*** 
//usando async/await
export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const data: Buffer = await readFile("data.json");
        await endPromise.bind(res)(data);//usando promisify
        console.log("File sent");
        //res.end(data, () => console.log("File sent"));
    }catch(err: any){
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    }
};
***/
/*** 
//usando encadenamiento de metodos
export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    readFile("data.json")
        .then((data: Buffer) => res.end(data, () => console.log("File sent")))
        .catch((err: Error) => {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        });
}
*/

/*** 
//uso de promises en el uso de archivos
export const handler = (req: IncomingMessage, res: ServerResponse) => {
    const p: Promise<Buffer> = readFile("data.json");
    p.then((data: Buffer) => res.end(data, () => console.log("File sent")));
    p.catch((err: Error) => {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    });
};

***/

/***import { readFile } from "fs";
//solicitud simple
export const handler = (req: IncomingMessage, res: ServerResponse) => {
    readFile("data.json", (err: Error | null, data: Buffer) => {
        if (err == null){
            res.end(data, () =>  console.log("File sent"));
        }
        else {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
};*///