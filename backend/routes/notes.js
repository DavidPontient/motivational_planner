const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/', async (req,res) => {
  const items = await Note.find().sort({created:-1});
  res.json(items);
});

router.post('/', async (req,res) => {
  const {title, body} = req.body;
  const n = new Note({title, body});
  await n.save();
  res.json({id: n._id});
});

router.delete('/:id', async (req,res) => {
  await Note.deleteOne({_id: req.params.id});
  res.json({deleted:true});
});

module.exports = router;
