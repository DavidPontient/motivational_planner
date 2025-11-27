const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: {type:String, required:true},
  hours: {type:Number, default:0},
  created: {type:Date, default: Date.now}
});
module.exports = mongoose.model('Subject', schema);
