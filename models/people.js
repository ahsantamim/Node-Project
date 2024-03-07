const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peopleinfo = new Schema({
  name: String,
  age: Number,
});

const People = mongoose.model('People', peopleinfo);

module.exports = People;
