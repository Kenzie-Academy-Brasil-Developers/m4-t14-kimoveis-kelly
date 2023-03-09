import { Request } from 'express'
import {z} from 'zod'

const userRequestSchema = z.object({
    name: z.string().max(45),
    email: z.string().max(45).email(),
    password: z.string().max(120),
    admin: z.boolean().default(false)
})

const userSchema = userRequestSchema.extend({
    id: z.number().int(),
    createdAt: z.string(),
    updatedAt: z.string().nullish(),
    deletedAt: z.string().nullish()
})

const userCreatedReturnSchema = userSchema.omit({
    password:true
})

const listUserSchema = userCreatedReturnSchema.array()

const userUpdateSchema = userSchema.partial().omit({
    admin: true,
    id: true
})

const loginUserSchema = userSchema.pick({
    email:true,
    password:true
})

export {userRequestSchema, userSchema, userCreatedReturnSchema, userUpdateSchema, listUserSchema, loginUserSchema}