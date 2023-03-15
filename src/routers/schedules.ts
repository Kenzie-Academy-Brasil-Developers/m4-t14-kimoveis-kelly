import { Router } from 'express'
import scheduleControllers from '../controllers/schedule.controllers'
import { validateIfUserIsAdminMid, validateReqBody, validateTokenIsValidMid } from '../middlewares'
import { scheduleRequestSchema } from '../schemas/schedule.schema'

const schedulesRoutes: Router = Router()

schedulesRoutes.post('', validateTokenIsValidMid, validateReqBody(scheduleRequestSchema),  scheduleControllers.create)
schedulesRoutes.get('/realEstate/:id', validateTokenIsValidMid, validateIfUserIsAdminMid, scheduleControllers.get)

export default schedulesRoutes