import { z } from 'zod'
import { categoryRequestSchema, categoryResponseSchema, listCategorySchema } from '../schemas/categories.schemas'


type tCreateCategoryRequest = z.infer<typeof categoryRequestSchema>
type tCreateCategoryResponse = z.infer<typeof categoryResponseSchema>
type tListCategory = z.infer<typeof listCategorySchema>

export{
    tCreateCategoryRequest,
    tCreateCategoryResponse,
    tListCategory
}