const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

router.get('/', async (req,res) => {
  const items = await Subject.find().sort({created:-1});
  res.json(items);
});

router.post('/', async (req,res) => {
  const {title, hours} = req.body;
  const s = new Subject({title, hours});
  await s.save();
  res.json({id: s._id});
});

router.delete('/:id', async (req,res) => {
  await Subject.deleteOne({_id: req.params.id});
  res.json({deleted: true});
});

module.exports = router;
