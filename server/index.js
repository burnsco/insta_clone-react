require('dotenv').config()
require('./db/connection')
const error = require('./error')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/posts')
const app = express()
const port = process.env.PORT

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api', routes)

// ERROR HANDLERS
app.use(error.notFound)
app.use(error.other)

// SOCKET IO + SERVER (NOT IMPLEMENTED YET)
app.listen(port, () => console.log(`[*** App Connected ***] Port: ${port}]`))
