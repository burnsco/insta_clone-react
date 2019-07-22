const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.js')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/me', auth, usersController.getUser)
router.get('/users', [auth, admin], usersController.getUsers)
router.post('/signup', usersController.signupUser)
router.post('/login', usersController.loginUser)

module.exports = router
