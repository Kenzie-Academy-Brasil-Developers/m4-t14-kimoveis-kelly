import { z } from 'zod'

const categoryRequestSchema = z.object({
    name: z.string().min(3).max(45)
})

const categoryResponseSchema = categoryRequestSchema.extend({
    id: z.number()
})

export {
    categoryRequestSchema,
    categoryResponseSchema
}