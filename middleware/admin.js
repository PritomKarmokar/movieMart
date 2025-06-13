const jwt = require('jsonwebtoken')
const logger = require("../config/logger")
const config = require('../config/setup')

const adminMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ msg: 'No Authorization header' })
        }

        const parts = authHeader.split(' ')
        if (parts.length != 2 || parts[0] != 'Bearer') {
            return res.status(401).json({
                msg: 'Invalid Authorization header format. Expected Bearer token.'
            })
        }

        const token = parts[1]
        jwt.verify(token, config.jwt_secret, (err, user) => {
            if (err) {
                logger.error(`Auth middleware error: ${err}`)

                return res.status(403).json({
                    msg: "Invalid or expired token"
                })
            }
            // if needed pass the user to the next middleware / request
            next()
        })

    } catch (err) {
        logger.error(`Error Occurred in Admin Middleware: ${err}`)
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
}

module.exports = adminMiddleware