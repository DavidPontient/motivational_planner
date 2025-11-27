require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));
const path = require('path');

const subjectsRoute = require('./routes/subjects');
const sessionsRoute = require('./routes/sessions');
const notesRoute = require('./routes/notes');

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;
if(!MONGODB_URI) console.error('MONGODB_URI not set in .env');

mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// API routes
app.use('/api/subjects', subjectsRoute);
app.use('/api/sessions', sessionsRoute);
app.use('/api/notes', notesRoute);

// Quotes proxy endpoint (uses adviceslip for reliability)
app.get('/api/quotes', async (req,res) => {
  try {
    const r = await fetch('https://api.adviceslip.com/advice');
    const j = await r.json();
    res.json({text: j.slip.advice});
  } catch (e) {
    res.status(500).json({error:'quote error'});
  }
});

// Serve static files (optional) - if you want to host frontend from same server
if(process.env.SERVE_STATIC === 'true'){
  app.use(express.static(path.join(__dirname, '..')));
  app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

