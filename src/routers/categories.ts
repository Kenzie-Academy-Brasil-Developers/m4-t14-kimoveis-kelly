import { Router } from 'express'
import categoryControllers from '../controllers/category.controllers'
import { validateIfUserIsAdminMid, validateReqBody, validateTokenIsValidMid } from '../middlewares'
import { categoryRequestSchema } from '../schemas/categories.schemas'

const categoriesRoutes: Router = Router()

categoriesRoutes.post('', validateTokenIsValidMid, validateIfUserIsAdminMid, validateReqBody(categoryRequestSchema), categoryControllers.create)
categoriesRoutes.get('', categoryControllers.get)
categoriesRoutes.get('/:id/realEstate', categoryControllers.getAllRealEstate)

export default categoriesRoutes