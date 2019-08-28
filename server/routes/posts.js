const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts.js')
const auth = require('../middleware/auth')

router.get('/posts', postsController.getPosts)
router.post('/posts', postsController.createPost)
router.put('/posts/:id', postsController.createComment)

module.exports = router
