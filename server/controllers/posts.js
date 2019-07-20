const fs = require('fs')
const posts = require('../db/data.json')
const Post = require('../db/connection')

exports.getPosts = (req, res) => {
  res.json(posts)
}
exports.getPost = (req, res) => {
  res.json(posts.find(p => p.id == req.params.id))
}

exports.createPost = (req, res) => {
  const post_ids = posts.map(p => p.id)
  const post = {
    id: Math.max(...post_ids) + 1,
    created: new Date(),
    ...req.body
  }
  const updatedPosts = [...posts, post]
  fs.writeFileSync('./db/data.json', JSON.stringify(updatedPosts))
  res.send(updatedPosts)
}

exports.editPost = (req, res) => {
  const updatedPosts = [...posts]
  const index = updatedPosts.map(p => p.id).indexOf(parseInt(req.params.id))
  const comment_ids = updatedPosts[index].comments.map(p => p.id)

  updatedPosts[index].comments.push({
    id: Math.max(...comment_ids) + 1,
    created: new Date(),
    username: req.body.username,
    text: req.body.text
  })
  fs.writeFileSync('./db/data.json', JSON.stringify(updatedPosts))
  res.send(updatedPosts)
}

exports.deletePost = (req, res) => {
  const updatedPosts = posts.filter(p => p.id != req.params.id)
  fs.writeFileSync('./db/data.json', JSON.stringify(updatedPosts))
}
