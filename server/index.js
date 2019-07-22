require('dotenv').config()
const config = require('config')
const error = require('./error')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')
const app = express()

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1)
}

mongoose
  .connect(process.env.DB_HOST, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('[*** MongoDB Connected ***] Port: 27017'))
  .catch(err => console.log(err))

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api', postRoutes)
app.use('/auth', userRoutes)

app.use(error.notFound)
app.use(error.other)

const port = 5000 || process.env.PORT
app.listen(port, () => console.log(`[*** App Connected ***] Port: ${port}]`))
