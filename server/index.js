require('dotenv').config()
const error = require('./error')
const express = require('express')
const mongoose = require('mongoose')
let mongoDB = 'mongodb://localhost:27017/instascram' || process.env.DB
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/users')
const app = express()

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('[*** MongoDB Connected ***] Port: 27017'))
  .catch(err => console.log(err))

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api', postRoutes)
app.use('/auth', authRoutes)

app.use(error.notFound)
app.use(error.other)

const port = 5000 || process.env.PORT
app.listen(port, () => console.log(`[*** App Connected ***] Port: ${port}]`))
