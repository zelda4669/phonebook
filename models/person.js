const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')
const url = config.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        logger.info('Connected to database')
    })
    .catch((error) => {
        logger.error('error connecting to mongodb', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'That name is too short, please use at least three characters'],
        unique: [true, 'That name is already in your phonebook!'],
        required: true
    },
    number: {
        type: String,
        minLength: [8, 'Phone numbers must have at least 8 digits.'],
        validate: {
            validator: function(v) {
                return /^[0-9]{2,}[-.]?[0-9]{2,}$/.test(v)
            },
            message: 'That\'s not a valid phone number! '
        },
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)