let mongoose = require('mongoose')
let mongoDB = 'mongodb://localhost:27017/instascram' || process.env.DB
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('[*** MongoDB Connected ***] Port: 27017'))
  .catch(err => console.log(err))

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
  try {
    const posts = await Post.find()
    return posts
  } catch (ex) {
    return ex
  }
}

async function createPost({ author, image, likes, body, comments, date }) {
  const post = new Post({
    author,
    image,
    likes,
    body,
    comments,
    date
  })
  try {
    const result = await post.save()
    return result
  } catch (ex) {
    return ex
  }
}

async function createUser({ email, username, password }) {
  const user = new User({
    email,
    username,
    password
  })
  try {
    const result = await user.save()
    return result
  } catch (ex) {
    return ex
  }
}

async function addComment(id, { author, body, date }) {
  try {
    const changedPost = await Post.findById(id)
    changedPost.comments.push({
      author,
      body,
      date
    })
    changedPost.save()
    return changedPost
  } catch (ex) {
    return ex
  }
}

module.exports = { createPost, getPosts, addComment, createUser }
