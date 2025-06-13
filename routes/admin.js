const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const config = require("../config/setup")
const logger = require("../config/logger")
const { Admin } = require('../models/admin')
const { signupSchema, signinSchema } = require("../validator/baseAuth")

const router = Router()

router.post('/signup', async (req, res) => {

    try {
        const validationResult = signupSchema.safeParse(req.body)

        if (!validationResult.success) {

            logger.info("Validation Error at Admin Sign Up Route")

            return res.status(400).json({
                msg: "Validation failed",
                errors: validationResult.error.issues
            })
        }

        const { username, password } = validationResult.data

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

router.post('/signin', async (req, res) => {
    try {
        const validationResult = signinSchema.safeParse(req.body)

        if (!validationResult) {
            logger.info("Validation Error at Admin Signin Route")

            return res.status(400).json({
                msg: "Validation failed",
                errors: validationResult.error.issues
            })
        }
        const { username, password } = validationResult.data

        const adminUser = await Admin.findOne({ username: username })

        if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign({ username }, config.jwt_secret)

        res.status(200).json({
            message: 'Signin successful',
            user:
            {
                username: adminUser.username,
                token: token
            }
        });

    } catch (err) {
        logger.error(`Error Occurred during Admin Signin: ${err}`)

        res.status(500).json({
            msg: "Error Occurred during Signing admin user"
        })
    }
})


module.exports = router