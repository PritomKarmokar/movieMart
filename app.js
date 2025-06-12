const express = require('express')
const config = require("./config/setup")

const app = express()

app.use(express.json())

const PORT = config.port

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})