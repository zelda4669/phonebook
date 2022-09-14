const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        'id': 1,
        'name': 'Arto Hellas',
        'number': '040-123456'
    },
    {
        'id': 2,
        'name': 'Ada Lovelace',
        'number': '39-44-5323523'
    },
    {
        'id': 3,
        'name': 'Dan Abramov',
        'number': '12-43-234345'
    },
    {
        'id': 4,
        'name': 'Mary Poppendieck',
        'number': '39-23-6423122'
    }
]

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
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

function getId() {
    return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    const name = persons.filter(p => p.name === body.name)

    console.log(name)

    if(!body.name) {
        return res.status(400).json({
            error: 'Please enter a name!'
        })
    } else if(!body.number) {
        return res.status(400).json({
            error: 'Please enter a phone number!'
        })
    } else if(name.length > 0) {
        return res.status(400).json({
            error: 'This person is already in your phonebook.'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getId()
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})