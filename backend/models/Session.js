const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  desc: {type:String, required:true},
  date: {type:String, required:true}, // store as ISO date string (yyyy-mm-dd)
  start: {type:String, required:true}, // HH:MM
  end: {type:String, required:true},
  created: {type:Date, default: Date.now}
});
module.exports = mongoose.model('Session', schema);
