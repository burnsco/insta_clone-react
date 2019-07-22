const { User, validate } = require('../models/user.js')
const _ = require('lodash')
const bcrypt = require('bcrypt')

exports.getUser = async (req, res) => {
  let user = await User.findById(req.user._id).select('-password')
  if (!user) return res.status(404).send('user does not exist')
  res.send(_.pick(user, ['_id', 'username', 'email']))
}

exports.getUsers = async (req, res, next) => {
  const users = await User.find().select('-password')
  res.send(users)
  next()
}

exports.signupUser = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('email taken')

  user = new User(_.pick(req.body, ['username', 'email', 'password']))
  const salt = await bcrypt.genSaltSync(12)
  user.password = await bcrypt.hashSync(user.password.trim(), salt)
  await user.save()

  const token = user.generateAuthToken()
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'username', 'email']))
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

  const token = user.generateAuthToken()
  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'username', 'email']))
}
