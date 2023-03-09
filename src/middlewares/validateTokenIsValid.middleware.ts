import { NextFunction, Request, Response } from 'express'
import error from '../error'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


const validateTokenIsValidMid = (req: Request, res: Response, next:NextFunction): Response | void =>{
    let token = req.headers.authorization

    if(!token) throw new error.AppError('Missing bearer token', 401)

    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY!, (err, decoded: any) =>{
        if(err) throw new error.AppError(err.message, 401)  
        req.user ={
            id: Number(decoded?.sub),
            admin: decoded.admin
        }
    })

    return next()
}

export{
    validateTokenIsValidMid
}