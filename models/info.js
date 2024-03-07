const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userinfo = new Schema(
  {
    id: String,
    name: String,
  },
  { timestamps: true },
);

const Info = mongoose.model('Info', userinfo);
module.exports = Info;
