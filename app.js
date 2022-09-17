const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const cors = require('cors')

const basicRouter = require('./controllers/routes')
const personRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use('/', basicRouter)
app.use('/api/persons', personRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app