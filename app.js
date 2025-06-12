const express = require('express')
const config = require("./config/setup")
const logger = require("./config/logger")
const connectDB = require("./config/db")

const app = express()

app.use(express.json())

connectDB()

const PORT = config.port

app.listen(PORT, () => {
    logger.info(`Server running on port: ${PORT}`)
})