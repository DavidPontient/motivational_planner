const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

router.get('/', async (req,res) => {
  const items = await Session.find().sort({date:1, start:1});
  res.json(items);
});

router.post('/', async (req,res) => {
  const {desc, date, start, end} = req.body;
  const s = new Session({desc, date, start, end});
  await s.save();
  res.json({id: s._id});
});

router.delete('/:id', async (req,res) => {
  await Session.deleteOne({_id: req.params.id});
  res.json({deleted:true});
});

module.exports = router;
