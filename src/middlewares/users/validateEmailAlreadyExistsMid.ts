import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import error from "../../error";


const validateEmailAlreadyExistMid = async (req:Request, res: Response, next: NextFunction) =>{
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    if(req.body.email){
        const findUserEmail = await userRepository.findOneBy({
            email: req.body.email
        })
        if(findUserEmail) throw new error.AppError('Email already exists', 409)
    }
    return next()
}

export default validateEmailAlreadyExistMid