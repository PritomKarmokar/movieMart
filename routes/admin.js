const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const logger = require("../config/logger")
const { Admin } = require('../models/admin')

const router = Router()

router.post('/signup', async (req, res) => {
    const { username, password } = req.body

    try {
        const adminUser = await Admin.findOne({ username: username })

        if (adminUser) {
            return res.status(400).json({
                msg: `Admin with the following username ${username} already exists`
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdminUser = new Admin({ username, password: hashedPassword });


        await newAdminUser.save()

        logger.info('New Admin User Created Successfully')

        res.status(201).json({
            msg: "New Admin User created successfully"
        })

    } catch (err) {

        logger.error(`Error Occurred During Creating new Admin: ${err}`)

        res.status(500).json({
            msg: "Error occurred during creating new admin user"
        })
    }
})

module.exports = router