import { Request, Response } from 'express'
import { tCreateRealEstateRequest } from '../interfaces/realEstate.interfaces'
import realEstateServices from '../services/realEstate/realEstate.services'

const create = async (req: Request, res:Response):Promise<Response> =>{
    const realEstateData: tCreateRealEstateRequest = req.body
    const realEstateCreated = await realEstateServices.create(realEstateData)

    return res.status(201).json(realEstateCreated)
}

const get = async (req: Request, res:Response):Promise<Response> =>{
    const realEstateList = await realEstateServices.get()

    return res.status(200).json(realEstateList)
}

export default {
    create,
    get
}