import {z} from 'zod'
import { listRealEstateSchema, realEstateRequestSchema, realEstateResponseSchema } from '../schemas/realEstate.schemas'

type tCreateRealEstateRequest = z.infer<typeof realEstateRequestSchema>
type tCreateRealEstateResponse = z.infer<typeof realEstateResponseSchema>

type tlistRealEstate = z.infer<typeof listRealEstateSchema>

export{
    tCreateRealEstateRequest,
    tCreateRealEstateResponse,
    tlistRealEstate
}