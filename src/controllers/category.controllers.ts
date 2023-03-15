import { Request, Response } from 'express'
import categoryServices from '../services/category/category.services'
import estatesPerCategoryServices from '../services/category/estatesPerCategory.services'


const create = async (req: Request, res:Response):Promise<Response> =>{
   
    const categoryCreated = await categoryServices.create(req.body)

    return res.status(201).json(categoryCreated)
}

const get = async (req: Request, res:Response):Promise<Response> =>{

    return res.status(200).json(await categoryServices.get())

}
const getAllRealEstate = async (req: Request, res:Response):Promise<Response> =>{
    
    return res.status(200).json(await estatesPerCategoryServices.get(Number(req.params.id)))
}

export default {
    create,
    get,
    getAllRealEstate
}