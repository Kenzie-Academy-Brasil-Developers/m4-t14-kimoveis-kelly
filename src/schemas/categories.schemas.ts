import { z } from 'zod'
import { listRealEstateSchema, realEstateResponseSchema } from './realEstate.schemas'

const categoryRequestSchema = z.object({
    name: z.string()
})

const categoryResponseSchema = categoryRequestSchema.extend({
    id: z.number()
})

const listCategorySchema = z.array(categoryResponseSchema) 

const listAllRealEstateFromCategory = z.object({
    id: z.number(),
    name: z.string(),
    realEstate: realEstateResponseSchema.array()
})
export {
    categoryRequestSchema,
    categoryResponseSchema,
    listCategorySchema
}