const { z } = require('zod')

const baseAuthSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exeed 20 characters"),

    password: z.string()
        .min(5, "Password must be at least 5 characters")
        .max(30, "Password cannot exceed 30 characters")
})

const signupSchema = baseAuthSchema
const signinSchema = baseAuthSchema

module.exports = { signinSchema, signupSchema }