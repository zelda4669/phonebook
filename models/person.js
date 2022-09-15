const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connected to mongodb', url)

mongoose.connect(url)
    .then((result) => {
        console.log('connected to mongodb')
    })
    .catch((err) => {
        console.log('error connecting to mongodb', err.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)