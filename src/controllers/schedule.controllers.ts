import { Request, Response } from 'express'
import { tScheduleRequest } from '../interfaces/schedule.interfaces'
import scheduleServices from '../services/schedule/schedule.services'

const create = async (req: Request, res:Response):Promise<Response> =>{
    const scheduleRequest: tScheduleRequest = req.body
    const scheduleCreated = await scheduleServices.create(scheduleRequest, req.user.id)

    return res.status(201).json(scheduleCreated)
}

const get = async (req: Request, res:Response):Promise<Response> =>{
    
    const scheduleList = await scheduleServices.get(Number(req.params.id))

    return res.status(200).json(scheduleList)
}

export default {
    create,
    get
}