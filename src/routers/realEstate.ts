import { Router } from 'express'
import realEstateControllers from '../controllers/realEstate.controllers'
import { validateIfUserIsAdminMid, validateReqBody, validateTokenIsValidMid } from '../middlewares'
import validateAddressAlreadyExistMid from '../middlewares/realEstate/validateAddressAlreadyExists.middleware'
import { realEstateRequestSchema } from '../schemas/realEstate.schemas'

const realEstateRoutes: Router = Router()

realEstateRoutes.post('', validateTokenIsValidMid, validateIfUserIsAdminMid, validateReqBody(realEstateRequestSchema), validateAddressAlreadyExistMid, realEstateControllers.create )
realEstateRoutes.get('', realEstateControllers.get)

export default realEstateRoutes