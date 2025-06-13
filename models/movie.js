const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true },
    description: { type: String },
    rentalPrice: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    piecesAvailable: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = { Movie }