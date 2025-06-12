const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    rentedMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true }
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = { Customer }