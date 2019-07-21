const express = require('express')
const router = express.Router()
const db = require('../db')
const _ = require('lodash')

// CREATE USER
router.post('/users', async (req, res) => {
  let user = await db.User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('email taken')
  db.createUser(_.pick(req.body, ['email', 'username', 'password']))
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

module.exports = router
