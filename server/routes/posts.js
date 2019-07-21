const express = require('express')
const router = express.Router()
const _ = require('lodash')
const db = require('../db')

// GET ALL POSTS
router.get('/posts', (req, res) => {
  db.getPosts().then(response => res.json(response))
})

// CREATE POST
router.post('/posts', (req, res) => {
  db.createPost(
    _.pick(req.body, ['author', 'image', 'likes', 'body', 'comments', 'date'])
  ).then(response => res.json(response))
})

// EDIT POST (CREATE COMMENTS)
router.put('/posts/:id', (req, res) => {
  db.addComment(
    req.params.id,
    _.pick(req.body, ['author', 'body', 'date'])
  ).then(response => res.json(response))
})

module.exports = router
