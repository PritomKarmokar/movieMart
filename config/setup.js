require('dotenv').config()

const config = {
    jwt_secret: process.env.JWT_SECRET,
    mongodbUri: process.env.MONGO_DB_URI,
    port: parseInt(process.env.PORT || 3000),
    log_level: process.env.LOG_LEVEL || "info"
}

module.exports = config