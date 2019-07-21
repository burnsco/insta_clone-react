const { User, validate } = require('../models/user.js')
const _ = require('lodash')
const bcrypt = require('bcrypt')

exports.signupUser = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('email taken')

  user = new User(_.pick(req.body, ['username', 'email', 'password']))
  const salt = await bcrypt.genSaltSync(12)
  user.password = await bcrypt.hashSync(newUser.password.trim(), salt)
  await user.save()
  res.json(user)
}

exports.loginUser = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('invalid email or password')

  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  )
  if (!validPassword) return res.status(400).send('invalid email or password')

  // generate token send back details

  res.json(user)
}
