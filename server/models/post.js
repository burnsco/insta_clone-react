const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  author: String,
  image: String,
  likes: {
    type: Number,
    default: 0
  },
  body: String,
  comments: [{ author: String, body: String, date: Date }],
  date: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', postSchema)

exports.Post = Post
