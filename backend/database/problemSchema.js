const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  ID: String,
  Name: String,
  URL: String,
  Difficulty: String,
  Tags: [String]
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;