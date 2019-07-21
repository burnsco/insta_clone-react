let mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
      unique: true
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    }
  })
)

const Post = mongoose.model(
  'Post',
  new mongoose.Schema({
    author: {
      type: String,
      required: true
    },
    image: String,
    likes: Number,
    body: String,
    comments: [{ author: String, body: String, date: Date }],
    date: { type: Date, default: Date.now }
  })
)

async function getPosts() {
  const posts = await Post.find()
  return posts
}

async function createPost(newPost) {
  const post = new Post({
    ...newPost
  })

  const result = await post.save()
  return result
}

async function createUser(newUser) {
  const hashedPassword = bcrypt.hashSync(newUser.password.trim(), 12)

  const user = new User({
    email: newUser.email,
    username: newUser.username,
    password: hashedPassword
  })
  const result = await user.save()
  return _.pick(result, ['_id', 'email', 'username'])
}

async function addComment(id, { author, body, date }) {
  const changedPost = await Post.findById(id)
  changedPost.comments.push({
    author,
    body,
    date
  })
  changedPost.save()
  return changedPost
}

module.exports = { createPost, getPosts, addComment, createUser, User }
