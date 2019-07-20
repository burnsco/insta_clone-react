const express = require('express')
const router = express.Router()
const db = require('../db')

// CREATE USER
router.post('/users', (req, res) => {
  db.createUser(req.body)
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

module.exports = router
