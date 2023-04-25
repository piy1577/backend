import http from "http";
import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { loadUserData } from "./User.model.js";

dotenv.config();

const MongoURL = process.env.MONGOURL;

mongoose.connection.once("open", () => {
    console.log("MongoDB Connection ready");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

async function startServer() {
    await mongoose.connect(MongoURL);
    await loadUserData(http.createServer(app));
}

startServer();
