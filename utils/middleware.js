const morgan = require('morgan')
morgan.token('content', function (req) {return JSON.stringify(req.body)})
const logString = ':method :url :status :res[content-length] :response-time ms :content'
const requestLogger = morgan(logString)

const unknownEndpoint = (req, res) => {
    res.status(404).send('I\'m sorry, I can\'t find that page!')
}

const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError') {
        return res.status(400).send('There is no one with that id in the database')
    } else if(error.name === 'ValidationError') {
        return res.status(400).send(error.message)
    }

    next(error)
}

const middleware = { requestLogger, unknownEndpoint, errorHandler }

module.exports = middleware