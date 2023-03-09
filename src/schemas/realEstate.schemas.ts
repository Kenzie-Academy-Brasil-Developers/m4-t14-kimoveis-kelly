import { z } from 'zod'
import { addressReturnSchema } from './address.schemas'
import { categoryResponseSchema } from './categories.schemas'

const realEstateRequestSchema = z.object({
    sold: z.boolean().default(false),
    value: z.string().or(z.number().transform(n => n.toString())).transform((n)=> {
        if(typeof n === 'string') parseFloat(n).toFixed(2)
    }),
    size: z.number().positive().int()

})

const realEstateResponseSchema = realEstateRequestSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullish(),
    address: addressReturnSchema.pick({
        street:true,
        zipCode: true,
        number: true,
        city: true,
        state: true
    }),
    categoryId: categoryResponseSchema.pick({id: true})  
})

export{
    realEstateRequestSchema,
    realEstateResponseSchema
}