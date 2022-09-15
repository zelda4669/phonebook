require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const morgan = require('morgan')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('content', function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :content'))

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if(err.name == 'CastError') {
        return response.status(400).send({error: 'malformed id'})
    }

    next(err)
}

app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/info', (req, res) => {
    let len = persons.length
    let date = new Date().toString()
    res.send(`<p>Phonebook has info for ${len} people</p>
    <p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(p => {
        res.json(p)
    })
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
        .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    console.log(body)

    if(body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new:true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})