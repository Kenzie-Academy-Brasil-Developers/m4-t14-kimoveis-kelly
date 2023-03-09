import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import error from "../../error";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";


const validateUserExistsMid = async (req:Request, res: Response, next: NextFunction) =>{
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const user: User | null = await userRepository.findOneBy({
        id: +req.params.id
    })
    
    if(!user) throw new error.AppError('User not found', 404)



    return next()
}

export {
    validateUserExistsMid
}