const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts.js')
const auth = require('../middleware/auth')

router.get('/posts', auth, postsController.getPosts)
router.post('/posts', auth, postsController.createPost)
router.put('/posts/:id', auth, postsController.createComment)

module.exports = router
