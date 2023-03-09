import { Router } from 'express'
import { loginController } from '../controllers/login.controllers'
import { validateReqBody } from '../middlewares/validateReqBody.middleware'
import { loginUserSchema } from '../schemas/users.schemas'

const loginRoute: Router = Router()

loginRoute.post('', validateReqBody(loginUserSchema), loginController)

export default loginRoute