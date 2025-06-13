const express = require('express')
const connectDB = require('./config/db')
const config = require('./config/setup')
const logger = require('./config/logger')
const adminRouter = require('./routes/admin')
const customerRouter = require('./routes/customer')
const loggerMiddleware = require('./middleware/logger')

const app = express()

app.use(express.json())

app.use(loggerMiddleware)

connectDB()

app.use('/admin', adminRouter)

app.use('/customer', customerRouter)

app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Welcome, to this world'
    })
})

const PORT = config.port

app.listen(PORT, () => {
    logger.info(`Server running on port: ${PORT}`)
})