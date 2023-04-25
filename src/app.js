import express from "express";
import { getAllUser } from "./User.model.js";
const app = express();

app.get("/", async (req, res) => {
    res.status(200).json(await getAllUser());
});

export default app;
