const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const config = require('../config/setup')
const logger = require('../config/logger')
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')
const customerMiddleware = require('../middleware/customer')
const formatDateTime = require('../helpers/date_format')
const { signupSchema, signinSchema } = require('../validator/baseAuth')

const router = Router()

router.post('/signup', async (req, res) => {
    try {
        const validationResult = signupSchema.safeParse(req.body)

        if (!validationResult.success) {

            logger.info('Validation Error at User Sign Up Route')

            return res.status(400).json({
                msg: 'Validation failed',
                errors: validationResult.error.issues
            })
        }

        const { username, password } = validationResult.data

        const customer = await Customer.findOne({ username: username })

        if (customer) {
            return res.status(400).json({
                msg: `Customer with the following username ${username} already exists`
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newCustomer = new Customer({ username, password: hashedPassword })

        await newCustomer.save()

        res.status(201).json({
            msg: 'Signup successful'
        })

    } catch (err) {
        logger.error(`Error occurred during signing up new customer`)

        res.status(500).json({
            msg: "Error Occurred during signing up new customer"
        })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const validationResult = signinSchema.safeParse(req.body)

        if (!validationResult.success) {
            logger.info('Validation Error at Customer Signin Router')
            return res.status(400).json({
                msg: 'Validation failed',
                errors: validationResult.error.issues
            })
        }

        const { username, password } = validationResult.data

        const customer = await Customer.findOne({ username: username })

        if (!customer || !(await bcrypt.compare(password, customer.password))) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign({ username }, config.jwt_secret, { expiresIn: '24h' })
        res.status(200).json({
            message: 'Signin successful',
            user: {
                username: customer.username,
                token: token
            }
        })
    } catch {
        logger.error(`Error Occurred during Customer Signing In`)

        res.status(500).json({
            msg: 'Error Occurred during Signing admin user'
        })
    }
})

router.post('/rent/movie/:movieId', customerMiddleware, async (req, res) => {
    try {
        const movieId = req.params.movieId
        const user = req.user

        const movie = await Movie.findOne({ _id: movieId, isAvailable: true })

        if (!movie) {
            return res.status(400).json({
                msg: "Movie with the following Id doesn't available right now"
            })
        }

        const customer = await Customer.findOne({ username: user.username, rentedMovies: movieId })

        if (customer) {
            return res.status(400).json({
                msg: "Movie is already rented by the user"
            });
        }

        const result = await Customer.updateOne(
            { username: user.username },
            { $push: { rentedMovies: movieId } }
        )

        if (result.modifiedCount === 0) {
            return res.status(404).json({
                msg: "Customer info not found or no update made"
            })
        }

        return res.status(200).json({
            msg: "Movie purchasing successful"
        })

    } catch (err) {
        logger.error(`Error Occurred during renting movie: ${err}`)

        return res.status(400).json({
            msg: "Error Occurred during renting movie"
        })
    }
})

router.get('/movies', customerMiddleware, async (req, res) => {
    const allMovies = await Movie.find({})

    if (allMovies.length == 0) {
        return res.status(202).json({
            msg: "Sorry, currently no movies are available, we're adding asap"
        })
    }

    const movies = allMovies.map(movie => ({
        id: movie._id,
        title: movie.title,
        genre: movie.genre,
        description: movie.description,
        rentalPrice: movie.rentalPrice,
        piecesAvailable: movie.piecesAvailable,
        addedAt: formatDateTime(movie.createdAt)
    }))

    res.status(200).json({
        msg: "Available Movies",
        movies: movies
    })
})

router.get('/rentedMovies', customerMiddleware, async (req, res) => {
    try {

        const customer = await Customer.findOne({ username: req.user.username })

        if (!customer || !customer.rentedMovies || customer.rentedMovies.length === 0) {
            return res.status(404).json({
                msg: "No rented movies available"
            });
        }

        const movies = await Movie.find({
            _id: {
                "$in": customer.rentedMovies
            }
        })

        if (movies.length === 0) {
            return res.status(202).json({
                msg: "No movies info available"
            })
        }

        const moviesInfo = movies.map(movie => ({
            id: movie._id,
            title: movie.title,
            genre: movie.genre,
            description: movie.description,
            price: movie.rentalPrice,
        }))

        res.status(200).json({
            msg: "All rented movies",
            movies: moviesInfo
        })

    } catch (err) {
        logger.error(`Error fetching rented movies: ${err}`);

        return res.status(500).json({
            msg: "An error occurred while fetching rented movies"
        });
    }
})

module.exports = router