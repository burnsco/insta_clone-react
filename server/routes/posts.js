const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts')
const db = require('../db/connection')

// GET ALL POSTS
router.get('/posts', (req, res) => {
  db.getPosts().then(response => res.json(response))
})

// CREATE POST
router.post('/posts', (req, res) => {
  db.createPost(req.body).then(() => res.send('success'))
})

// GET SINGLE POST
router.get('/posts/:id', (req, res) => {
  db.getPost(req.params.id).then(response => {
    res.json(response)
  })
})

// EDIT POST (CREATE COMMENTS)
router.put('/posts/:id', (req, res) => {
  db.getPost(req.params.id, req.body)
  res.json({ sent: 'true' })
})

// DELETE A POST
router.delete('/posts/:id', postsController.deletePost)

module.exports = router
