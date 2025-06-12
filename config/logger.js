const { createLogger, transports, format } = require("winston")
const config = require("./setup")

const logger = createLogger({
    level: config.log_level,
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`
        })
    ),
    transports: [new transports.Console()]
})

module.exports = logger