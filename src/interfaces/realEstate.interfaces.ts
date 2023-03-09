import {z} from 'zod'
import { realEstateRequestSchema, realEstateResponseSchema } from '../schemas/realEstate.schemas'

type tCreateRealEstateRequest = z.infer<typeof realEstateRequestSchema>
type tCreateRealEstateResponse = z.infer<typeof realEstateResponseSchema>


export{
    tCreateRealEstateRequest,
    tCreateRealEstateResponse
}