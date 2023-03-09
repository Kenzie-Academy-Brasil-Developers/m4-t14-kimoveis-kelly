import { Request, Response } from 'express'
import { tLogin } from '../interfaces/login.interfaces'
import { loginService } from '../services/login/login.services'

const loginController = async (req: Request, res:Response):Promise<Response> =>{
    const loginData: tLogin = req.body
    const token = await loginService(loginData)

    return res.json({
        token: token
    })

}

export{
    loginController
}