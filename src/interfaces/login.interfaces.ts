import { z } from 'zod'
import { loginUserSchema } from '../schemas/users.schemas'

type tLogin = z.infer<typeof loginUserSchema>

export{
    tLogin
}