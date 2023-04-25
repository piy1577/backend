import express from "express";
import { getAllUser } from "./User.model.js";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.get("/", async (req, res) => {
    res.status(200).json(await getAllUser());
});

export default app;
