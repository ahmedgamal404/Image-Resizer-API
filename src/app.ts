//************************************ -------------------------  ************************************/
//***************************************************************************************************/

// Importing modules
import express from "express";
import cors from "cors";
import { handler } from "./router";

// Declaring vars
const app = express();
const port: number = 3000;

// Adding meddilware
app.use(cors());

// Making server
const startServer = app.listen(port, () => {
    console.log(`The server is woking on port ${port}`);
});

// Making Endpoint
app.get("/api", handler);

// Exporting modules
export { app, startServer };
