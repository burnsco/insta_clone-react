let mongoose = require('mongoose')
let Schema = mongoose.Schema

let PostSchema = Schema({
  title: { type: String },
  body: { type: String },
  date: { type: Date },
  tags: [{ type: String }],
  _author: { type: Schema.Types.ObjectId, ref: 'author' }
})

let AuthorSchema = Schema({
  name: { type: String },
  photo: { type: String },
  bio: { type: String },
  username: { type: String, index: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
  password: { type: String }
})

let Author = mongoose.model('author', AuthorSchema)
let Post = mongoose.model('post', PostSchema)

module.exports = Author
module.exports = Post

module.exports.createAuthor = (newAuthor, callback) => {
  newAuthor.save(callback)
}

module.exports.createPost = (username, newPost, callback) => {
  Author.findOne({ username: username }).then(
    author => {
      newPost._author = author._id
      author.posts.push(newPost)
      newPost.save().then(err, auth)
      author.save(callback)
    },
    err => {
      if (err) throw err
    }
  )
}

module.exports.getAuthorByPostTitle = (postTitle, callback) => {
  Post.findOne({ title: postTitle })
    .populate('_author')
    .exec((err, post) => {
      if (err) throw err
      else return post._author
    })
}

module.exports.getPostsByAuthorId = (authorId, callback) => {
  Post.find({ _author: authorId }).exec((err, posts) => {
    if (err) throw err
    else return posts
  })
}

const allPosts = []

Author.find({}, function(err, users) {
  if (err) throw err

  users.forEach(function(user) {
    const a = user.posts
    a.forEach(us => allPosts.push(us))
  })
})
