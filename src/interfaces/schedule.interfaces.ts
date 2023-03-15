import { z } from  'zod'
import { allScheduleForRealEstate, scheduleRequestSchema, scheduleResponseSchema } from '../schemas/schedule.schema'

type tScheduleRequest = z.infer<typeof scheduleRequestSchema>
type tScheduleResponse = z.infer<typeof scheduleResponseSchema>
type tAllScheduleForOneRealEstate = z.infer<typeof allScheduleForRealEstate>

export {
    tScheduleRequest,
    tScheduleResponse,
    tAllScheduleForOneRealEstate 
}
