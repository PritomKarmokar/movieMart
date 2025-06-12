const mongoose = require('mongoose')
const config = require("./setup")
const logger = require("./logger")

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodbUri)
        logger.info("Database Connection Established")
    } catch (err) {
        logger.error(`DB Connection Error: ${err}`)
        process.exit(1)
    }
}

module.exports = connectDB