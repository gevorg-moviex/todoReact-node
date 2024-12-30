import express, { text } from "express";
import mysql2 from "mysql2"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors());

const con = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DATABASEPSWRD,
    database: process.env.DB
})

let tasks;
app.get("/data", (req, res) => {
    con.query("SELECT * FROM tasks", function(err, result) {
        if (err) res.send(err);
        tasks = result;
    })
    res.json(tasks)
})

app.post("/getData", (req, res) => {
    let sql = 'INSERT INTO tasks (text) VALUES (?)';
    con.query(sql, [req.body.text], function(err, result) {
        if (err) res.send(err);
        console.log(req.body.text);
        res.status(200).send({ message: "Task added successfully" });
    })
})

app.post("/clear", (req, res) => {
    con.query("DELETE FROM tasks", function(err, result) {
        if (err) {
            return res.send(err);
        }

        con.query("ALTER TABLE tasks AUTO_INCREMENT = 1", function(err, result) {
            if (err) {
                return res.send(err);
            }

            res.send("All tasks cleared and ID counter reset to 1");
        });
    });
});

app.post("/deleteRow", (req, res) => {
    const itemId = req.body.itemId;
    
    let sqlDelete = "DELETE FROM tasks WHERE id = ?";
    con.query(sqlDelete, [itemId], function (err) {
        if (err) return res.status(500).send(err);
        res.send("Row is Deleted!")
    });
});

app.listen(process.env.PORT)