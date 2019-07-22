const _ = require('lodash')
const { Post } = require('../models/post.js')

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
  res.send(posts)
}

exports.createPost = async (req, res) => {
  let post = new Post(_.pick(req.body, ['author', 'image', 'likes', 'body']))
  post = await post.save()

  res.send(post)
}

exports.createComment = async (req, res) => {
  let id = req.params.id
  let { author, body } = req.body

  const post = await Post.findById(id)
  if (!post) return res.status(404).send('this post does not exist')

  post.comments.push({
    author,
    body,
    date: Date.now()
  })
  post = await post.save()

  res.send(post)
}
