import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// server.events.on("request:start", (request) => {
// 	console.log("Outgoing:", request.method, request.url.href);
// });

// server.events.on("request:match", (req) => {
// 	console.log("%s %s has a handler!", req.method, req.url.href);
// });

// server.events.on("request:unhandled", (req) => {
// 	console.log("%s %s has no handler", req.method, req.url.href);
// });

// server.events.on("response:mocked", (res, reqId) => {
// 	const responseText = res.body;
// 	console.log("sent a mocked response", reqId, responseText);
// });

// server.events.on("response:bypass", (res, reqId) => {
// 	const responseText = res.body;
// 	console.log("sent an original response", reqId, responseText);
// });

// server.printHandlers();
