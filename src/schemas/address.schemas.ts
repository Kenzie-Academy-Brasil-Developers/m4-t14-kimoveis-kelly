import {z} from 'zod'

const addressRequestSchema = z.object({
    street: z.string().max(45),
    zipCode: z.string().min(4).max(8),
    number: z.string().max(7),
    city: z.string().max(20),
    state: z.string().max(2)
})

const addressReturnSchema = addressRequestSchema.extend({
    id: z.number()
})


export {addressRequestSchema, addressReturnSchema}