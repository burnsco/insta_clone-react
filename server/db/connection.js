let mongoose = require('mongoose')
let mongoDB = 'mongodb://localhost:27017/instascram'
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    console.log('[*** MongoDB Connected ***] Port: 27017')
  })
  .catch(err => {
    console.log(err)
  })

const postSchema = new mongoose.Schema({
  author: String,
  image: String,
  likes: Number,
  body: String,
  comments: [{ author: String, body: String, date: Date }],
  date: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', postSchema)

async function createPost({ author, image, likes, body, comments, date }) {
  const post = new Post({
    author,
    image,
    likes,
    body,
    comments,
    date
  })
  const result = await post.save()
}

function getPost(id, { author, body, date }) {
  Post.findById(id).then(post => {
    post.comments.push({
      author: author,
      body: body,
      date: date
    })
    post.save()
  })
}

async function getPosts() {
  const posts = await Post.find()
  return posts
}

module.exports = { createPost, getPosts, getPost }
