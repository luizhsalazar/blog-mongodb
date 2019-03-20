const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Blog = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
},{
    collection: 'blogs'
});

module.exports = mongoose.model('Blog', Blog);