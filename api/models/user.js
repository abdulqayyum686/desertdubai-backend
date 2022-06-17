const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    email: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    },
    password: {
        type: String,
        require: true,
    },
})

module.exports = mongoose.model('User', userSchema)