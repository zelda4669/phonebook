const basicRouter = require('express').Router()
const Person = require('../models/person')

basicRouter.get('/', (req, res) => {
    res.send('Hello world!')
})

basicRouter.get('/info', (req, res) => {
    let date = new Date().toString()

    Person.countDocuments({}, function(err, count) {
        res.send(`<p>Phonebook has info for ${count} people</p>
    <p>${date}</p>`)
    })
})

module.exports = basicRouter