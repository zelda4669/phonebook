require('dotenv').config()
const { response } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const morgan = require('morgan')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

morgan.token('content', function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :content'))

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/info', (req, res, next) => {
    let date = new Date().toString()

    Person.countDocuments({}, function(err, count) {
        res.send(`<p>Phonebook has info for ${count} people</p>
    <p>${date}</p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
        res.json(p)
    })
    .catch(error => (next(error)))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if(person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
            
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    console.log(req.params.id)
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id, 
        { name, number }, 
        { new:true, runValidators: true, context: 'query' }
        )
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError') {
        return res.status(400).send({ error: 'malformed id' })
    } else if(error.name === 'ValidationError') {
        console.log(error.message)
        return res.status(400).send(error.message)
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})