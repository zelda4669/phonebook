const personRouter = require('express').Router()
const Person = require('../models/person')

personRouter.get('/', (req, res, next) => {
    Person.find({}).then(p => {
        res.json(p)
    })
        .catch(error => (next(error)))
})

personRouter.get('/:id', (req, res, next) => {
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

personRouter.post('/', (req, res, next) => {
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

personRouter.put('/:id', (req, res, next) => {
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

personRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

module.exports = personRouter