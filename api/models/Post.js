const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  content: {
    type: String
  },
  content: {
    type: String
  },
  date: {
    type: Date
  },
  blog_id: {
    type: Schema.Types.ObjectId, ref: 'Blog'
  }
},{
    collection: 'posts'
});

module.exports = mongoose.model('Post', Post);