import { z } from 'zod'
import { realEstateResponseSchema } from './realEstate.schemas'
import { userCreatedReturnSchema } from './users.schemas'

const scheduleRequestSchema = z.object({
    date: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/),
    hour: z.string().regex(/^\d{2}:\d{2}$/),
    realEstateId: z.number(),
})

const scheduleResponseSchema = scheduleRequestSchema.extend({
    id: z.number(),
    user: userCreatedReturnSchema,
    realEstate: realEstateResponseSchema
}).omit({
    realEstateId: true
})

const allScheduleForRealEstate = z.object({
    id: z.number(),
    userId: userCreatedReturnSchema,  
})

export{
    scheduleRequestSchema,
    scheduleResponseSchema,
    allScheduleForRealEstate
}