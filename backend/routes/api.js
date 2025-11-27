import express from "express";
import { openDB } from "../db.js";

const router = express.Router();

// Subjects CRUD
router.get("/subjects", async (req, res) => {
  const db = await openDB();
  const subjects = await db.all("SELECT * FROM subjects");
// backend/routes/api.js
import express from "express";
import db from "../db.js";

const router = express.Router();

/** USERS **/
router.post("/users", (req, res) => {
  const { username, password } = req.body;
  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, username });
    }
  );
});

router.get("/users", (req, res) => {
  db.all("SELECT id, username FROM users", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

/** SUBJECTS / STUDY PLANS **/
router.post("/subjects", (req, res) => {
  const { user_id, name } = req.body;
  db.run(
    "INSERT INTO subjects (user_id, name) VALUES (?, ?)",
    [user_id, name],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, user_id, name });
    }
  );
});

router.get("/subjects/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  db.all("SELECT * FROM subjects WHERE user_id = ?", [user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

router.delete("/subjects/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM subjects WHERE id = ?", [id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deletedID: id });
  });
});

/** SESSIONS **/
router.post("/sessions", (req, res) => {
  const { user_id, subject_id, session_time, description } = req.body;
  db.run(
    "INSERT INTO sessions (user_id, subject_id, session_time, description) VALUES (?, ?, ?, ?)",
    [user_id, subject_id, session_time, description],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, user_id, subject_id, session_time, description });
    }
  );
});

router.get("/sessions/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  db.all("SELECT * FROM sessions WHERE user_id = ?", [user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

router.delete("/sessions/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM sessions WHERE id = ?", [id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deletedID: id });
  });
});

/** NOTES **/
router.post("/notes", (req, res) => {
  const { user_id, content } = req.body;
  db.run(
    "INSERT INTO notes (user_id, content) VALUES (?, ?)",
    [user_id, content],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, user_id, content });
    }
  );
});

router.get("/notes/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  db.all("SELECT * FROM notes WHERE user_id = ?", [user_id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM notes WHERE id = ?", [id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deletedID: id });
  });
});

export default router;
