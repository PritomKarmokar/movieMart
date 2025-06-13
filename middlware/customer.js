const jwt = require('jsonwebtoken')
const config = require('../config/setup')

const customerMiddleware = async (req, res, next) => {
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
                return res.status(403).json({
                    msg: "Invalid or expired token"
                })
            }
            req.user = user
            console.log(user)
            next()
        })
    } catch (err) {
        console.log(`Error Occurred in Customer Middleware: ${err}`)
        return res.status(403).json({ msg: "Invalid or expired token" });
    }
}

module.exports = customerMiddleware