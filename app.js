import cors from "cors";
import express from "express";
import dbConnection from "./db-connect.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.get("/", (req, res) => {
    res.send("Node Express REST Users API from deployment branch 🎉");
});

// READ all users
app.get("/users", (request, response) => {
    const query = "SELECT * FROM users ORDER BY name;"; // sql query to select all from the table users
    dbConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
