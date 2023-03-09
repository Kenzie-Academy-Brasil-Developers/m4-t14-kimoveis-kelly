import { DeepPartial } from 'typeorm'
import {z} from 'zod'
import { listUserSchema, userCreatedReturnSchema, userRequestSchema, userSchema, userUpdateSchema } from '../schemas/users.schemas'

type tCreateUserRequest = z.infer<typeof userRequestSchema>
type tCreateUserComplete = z.infer<typeof userSchema>
type tCreateUserResponse = z.infer<typeof userCreatedReturnSchema>

type tlistAllUsers = z.infer<typeof listUserSchema>

type tUpdateUserRequest = DeepPartial<tCreateUserRequest>

export{
    tCreateUserRequest,
    tCreateUserResponse,
    tCreateUserComplete,
    tlistAllUsers,
    tUpdateUserRequest
}