import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities";
import error from "../../error";

const validateAddressAlreadyExistMid = async (req: Request, res: Response, next: NextFunction) => {
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
  
    const addressData = {
      street: req.body.address.street,
      city: req.body.address.city,
      state: req.body.address.state,
      country: req.body.address.country,
      postalCode: req.body.address.postalCode,
    };
  
    if (req.body.address.number) {
      const findAddress = await addressRepository.count({
        where: {
          ...addressData,
          number: req.body.address.number,
        },
      });
    
      if (findAddress) throw new error.AppError('Address already exists', 409)
    } else {
      const findAddress = await addressRepository.count({
        where: {
          ...addressData,
        },
      });
   
      if (findAddress) throw new error.AppError('Address already exists', 409)
    }
  
    return next();
  };
  
  export default validateAddressAlreadyExistMid;