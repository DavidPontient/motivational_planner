const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: String,
  body: String,
  created: {type:Date, default: Date.now}
});
module.exports = mongoose.model('Note', schema);
