const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(DB_FILE);

// Initialize tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    hours REAL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc TEXT,
    date TEXT,
    start TEXT,
    end TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    body TEXT,
    created TEXT
  )`);
});

// --- Quotes proxy (adviceslip is simple & reliable) ---
app.get('/api/quotes', async (req, res) => {
  try {
    const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
    const r = await fetch('https://api.adviceslip.com/advice');
    const j = await r.json();
    // return as {text, author?}
    res.json({text: j.slip.advice});
  } catch (e) {
    res.status(500).json({error:'quote error'});
  }
});

/// --- SUBJECTS ---
// get all
app.get('/api/subjects', (req,res) => {
  db.all('SELECT * FROM subjects ORDER BY id DESC', (err, rows) => {
    if(err) return res.status(500).json({error:err.message});
    res.json(rows);
  });
});
// add
app.post('/api/subjects', (req,res) => {
  const {title, hours} = req.body;
  db.run('INSERT INTO subjects (title,hours) VALUES (?,?)', [title, hours||null], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({id:this.lastID});
  });
});
// delete
app.delete('/api/subjects/:id', (req,res) => {
  db.run('DELETE FROM subjects WHERE id=?', [req.params.id], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({deleted: this.changes});
  });
});

/// --- SESSIONS ---
app.get('/api/sessions', (req,res) => {
  db.all('SELECT * FROM sessions ORDER BY date ASC, start ASC', (err, rows) => {
    if(err) return res.status(500).json({error:err.message});
    res.json(rows);
  });
});
app.post('/api/sessions', (req,res) => {
  const {desc,date,start,end} = req.body;
  db.run('INSERT INTO sessions (desc,date,start,end) VALUES (?,?,?,?)', [desc,date,start,end], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({id:this.lastID});
  });
});
app.delete('/api/sessions/:id', (req,res) => {
  db.run('DELETE FROM sessions WHERE id=?', [req.params.id], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({deleted:this.changes});
  });
});

/// --- NOTES ---
app.get('/api/notes', (req,res) => {
  db.all('SELECT * FROM notes ORDER BY created DESC', (err,rows)=>{
    if(err) return res.status(500).json({error:err.message});
    res.json(rows);
  });
});
app.post('/api/notes', (req,res) => {
  const {title, body} = req.body;
  const created = new Date().toISOString();
  db.run('INSERT INTO notes (title,body,created) VALUES (?,?,?)', [title,body,created], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({id:this.lastID});
  });
});
app.delete('/api/notes/:id', (req,res) => {
  db.run('DELETE FROM notes WHERE id=?', [req.params.id], function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({deleted:this.changes});
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Backend server running on http://localhost:${PORT}`));

