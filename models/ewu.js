const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const uniifo = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  department: { type: String, required: true },
});

const EWU = mongoose.model('EWU', uniifo);

module.exports = EWU;
