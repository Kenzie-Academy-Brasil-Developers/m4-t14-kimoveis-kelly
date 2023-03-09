import { Request, Response } from 'express'
import { tCreateUserRequest, tUpdateUserRequest } from '../interfaces/users.interfaces'
import usersServices from '../services/users/users.services'


const create = async (req: Request, res:Response):Promise<Response> =>{
    const userData: tCreateUserRequest = req.body
    const userCreated = await usersServices.create(userData)

    return res.status(201).json(userCreated)

}

const get = async (req: Request, res:Response):Promise<Response> =>{
   
    const allUsers = await usersServices.get()
    return res.status(200).json(allUsers)
}

const patch = async (req: Request, res:Response):Promise<Response> =>{
    const userData: tUpdateUserRequest = req.body
    const updateUser = await usersServices.update(userData, parseInt(req.params.id))

    return res.status(200).json(updateUser)
}

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    await usersServices.deleteUser(parseInt(req.params.id))
    return res.status(204).send()
}

export default {
    create,
    get,
    patch,
    deleteUser
}