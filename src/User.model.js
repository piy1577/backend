import User from "./User.mongo.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filname = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filname);

export async function getAllUser() {
    return await User.find({}, { _id: 0, __v: 0 });
}

export async function loadUserData(app) {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.join(__dirname, "..", "data", "sample_data.json"),
            "utf-8",
            (err, data) => {
                if (err) throw err;

                const dataArray = JSON.parse(data);

                const bulk = dataArray.map((doc) => {
                    return {
                        updateOne: {
                            filter: { id: doc.id },
                            update: doc,
                            upsert: true,
                        },
                    };
                });

                User.bulkWrite(bulk).then((results) => {
                    app.listen(8000, () => {
                        console.log("Listening on 8000");
                    });
                });
            }
        );
    });
}
