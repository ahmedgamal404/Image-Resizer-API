"use strict";
//************************************ -------------------------  ************************************/
//***************************************************************************************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
// Importing modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./router");
// Declaring vars
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
// Adding meddilware
app.use((0, cors_1.default)());
// Making server
const startServer = app.listen(port, () => {
    console.log(`The server is woking on port ${port}`);
});
exports.startServer = startServer;
// Making Endpoint
app.get("/api", router_1.handler);
