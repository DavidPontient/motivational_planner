import express from "express";
import { openDB } from "../db.js";

const router = express.Router();

// Subjects CRUD
router.get("/subjects", async (req, res) => {
  const db = await openDB();
  const subjects = await db.all("SELECT * FROM subjects");
  res.json(subjects);
});

router.post("/subjects", async (req, res) => {
  const { name } = req.body;
  const db = await openDB();
  await db.run("INSERT INTO subjects (name) VALUES (?)", [name]);
  res.json({ message: "Subject added" });
});

router.delete("/subjects/:id", async (req, res) => {
  const { id } = req.params;
  const db = await openDB();
  await db.run("DELETE FROM subjects WHERE id = ?", [id]);
  res.json({ message: "Subject deleted" });
});

// Sessions CRUD
router.get("/sessions", async (req, res) => {
  const db = await openDB();
  const sessions = await db.all("SELECT * FROM sessions");
  res.json(sessions);
});

router.post("/sessions", async (req, res) => {
  const { description, date } = req.body;
  const db = await openDB();
  await db.run("INSERT INTO sessions (description, date) VALUES (?, ?)", [description, date]);
  res.json({ message: "Session added" });
});

router.delete("/sessions/:id", async (req, res) => {
  const { id } = req.params;
  const db = await openDB();
  await db.run("DELETE FROM sessions WHERE id = ?", [id]);
  res.json({ message: "Session deleted" });
});

// Notes CRUD
router.get("/notes", async (req, res) => {
  const db = await openDB();
  const notes = await db.all("SELECT * FROM notes");
  res.json(notes);
});

router.post("/notes", async (req, res) => {
  const { content } = req.body;
  const db = await openDB();
  await db.run("INSERT INTO notes (content) VALUES (?)", [content]);
  res.json({ message: "Note saved" });
});

router.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const db = await openDB();
  await db.run("DELETE FROM notes WHERE id = ?", [id]);
  res.json({ message: "Note deleted" });
});

export default router;
