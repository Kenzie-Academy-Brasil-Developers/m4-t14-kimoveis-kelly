import { z } from 'zod'
import { realEstateResponseSchema } from './realEstate.schemas'
import { userCreatedReturnSchema } from './users.schemas'

const scheduleRequestSchema = z.object({
    date: z.string().regex(/^\d{4}\/\d{2}\/\d{2}$/),
    hour: z.string().regex(/^([0][8-9]|[1][0-8]):([0-5][0-9])$/),
    realEstateId: realEstateResponseSchema.pick({id: true}),
})

const scheduleResponseSchema = scheduleRequestSchema.extend({
    id: z.number(),
    userId: userCreatedReturnSchema.pick({id: true})
})

const allScheduleForRealEstate = z.object({
    id: z.number(),
    userId: userCreatedReturnSchema,
    
})

export{
    scheduleRequestSchema,
    scheduleResponseSchema
}