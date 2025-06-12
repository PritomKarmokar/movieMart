const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true }
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = { Admin }