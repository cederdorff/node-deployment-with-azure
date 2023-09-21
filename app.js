import cors from "cors";
import express from "express";
import dbConnection from "./db-connect.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.get("/", (req, res) => {
    res.send("Node Express REST Users API from RACEBASE🎉");
});

// READ all users
app.get("/users", async (request, response) => {
    const query = "SELECT * FROM users ORDER BY name;"; // sql query to select all from the table users
    const [results] = await dbConnection.execute(query);
    response.json(results);
});

app.get("/users/:id", async (request, response) => {
    const id = request.params.id;
    const query = "SELECT * FROM users WHERE id = ?;"; // sql query to select all from the table users
    const values = [id];
    const [results] = await dbConnection.execute(query, values);
    response.json(results);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
