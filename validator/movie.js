const { z } = require('zod')

const movieSchema = z.object({
    title: z.string()
        .min(3, "Title must be at least 3 characters")
        .max(30, "Title cannot exceed 30 characters"),
    genre: z.string()
        .min(5, "Genre must be at least 5 characters")
        .max(30, "Genre cannot exceed 10 characters"),

    description: z.string().optional(),
    rentalPrice: z.number().positive(),
    isAvailable: z.boolean().optional().default(true),
    piecesAvailable: z.number().positive(),
    createdAt: z.date().optional().default(() => new Date()),
    updatedAt: z.date().nullable().optional().default(null)
})

module.exports = { movieSchema }