import { NextFunction, Request, Response } from 'express';
import error from '../../error';


const validateIfUserIsAdminMid = async (req: Request, res: Response, next: NextFunction) =>{
    const authenticatedUser = req.user.admin
   
    if(req.method ==="PATCH" || req.method === "DELETE"){
        const idParam = parseInt(req.params.id)
        const idUserLogged = req.user.id

        if(idParam !== idUserLogged && !req.user.admin){
            throw new error.AppError("Insufficient permission", 403)
        }
        return next()
    }

    if(!authenticatedUser){
        throw new error.AppError("Insufficient permission", 403)
    }

    return next()
}
export {validateIfUserIsAdminMid}