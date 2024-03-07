const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const file = new Schema(
  {
    name: String,
    age: Number,
  },
  { timestamps: true },
);

const Form = mongoose.model('Form', file);
module.exports = Form;
