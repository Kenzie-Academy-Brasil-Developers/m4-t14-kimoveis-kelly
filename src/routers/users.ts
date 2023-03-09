import { Router } from 'express'
import usersControllers from '../controllers/users.controllers'
import { validateEmailAlreadyExistMid, validateIfUserIsAdminMid, validateReqBody, validateTokenIsValidMid, validateUserExistsMid } from '../middlewares'

import { userRequestSchema, userUpdateSchema } from '../schemas/users.schemas'

const usersRoutes: Router = Router()

usersRoutes.post('', validateReqBody(userRequestSchema), validateEmailAlreadyExistMid, usersControllers.create)
usersRoutes.get('', validateTokenIsValidMid, validateIfUserIsAdminMid, usersControllers.get)
usersRoutes.patch('/:id', validateTokenIsValidMid, validateReqBody(userUpdateSchema), validateUserExistsMid, validateIfUserIsAdminMid, usersControllers.patch)
usersRoutes.delete('/:id', validateTokenIsValidMid, validateUserExistsMid, validateIfUserIsAdminMid, usersControllers.deleteUser)

export default usersRoutes