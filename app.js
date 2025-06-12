const express = require('express')
const config = require("./config/setup")
const logger = require("./config/logger")
const connectDB = require("./config/db")
const loggerMiddleware = require("./middleware/logger")

const app = express()

app.use(express.json())

app.use(loggerMiddleware)

connectDB()

const PORT = config.port

app.get("/", (req, res) => {
    res.status(200).json({
        msg: "Welcome, to this world"
    })
})

app.listen(PORT, () => {
    logger.info(`Server running on port: ${PORT}`)
})