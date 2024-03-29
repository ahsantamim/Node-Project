const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
