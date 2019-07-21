const _ = require('lodash')
const { Post } = require('../models/post.js')

exports.getPosts = async (req, res) => {
  const posts = await Post.find()
  if (posts.length < 1) return res.status(404).send('there are no posts')

  res.send(posts)
}

exports.createPost = async (req, res) => {
  const post = new Post(_.pick(req.body, ['author', 'image', 'likes', 'body']))
  await post.save()

  res.send('post created')
}

exports.createComment = async (req, res) => {
  let id = req.params.id
  let { author, body, date } = req.body

  const post = await Post.findById(id)
  post.comments.push({
    author,
    body,
    date: Date.now()
  })
  await post.save()

  if (!post) return res.status(404).send('this post does not exist')

  res.send('comment created')
}
