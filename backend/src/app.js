import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";
import mongoose from "mongoose";

import cors from "cors";
import connectToServer from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js"

const app = express();
const server = createServer(app);
const io = connectToServer(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

app.get("/home",(req, res) => {
    return res.json({"message" : "hello world!"})
});


const start = async() => {
    const connectDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected DB Host : ${connectDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log(`Listening to port ${app.get("port")}`); 
    })
}


start();