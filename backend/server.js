const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = new sqlite3.Database("./database.sqlite");

app.use(cors());
app.use(bodyParser.json());

// Initialize table
db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc TEXT,
    date TEXT,
    start TEXT,
    end TEXT
)`);

// Get sessions
app.get("/sessions", (req, res) => {
    db.all("SELECT * FROM sessions", (err, rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

// Add session
app.post("/sessions", (req, res) => {
    const { desc, date, start, end } = req.body;
    db.run("INSERT INTO sessions (desc, date, start, end) VALUES (?, ?, ?, ?)", [desc, date, start, end], function(err){
        if(err) res.status(500).send(err);
        else res.json({ id: this.lastID });
    });
});

// Delete session
app.delete("/sessions/:id", (req, res) => {
    db.run("DELETE FROM sessions WHERE id = ?", [req.params.id], function(err){
        if(err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
