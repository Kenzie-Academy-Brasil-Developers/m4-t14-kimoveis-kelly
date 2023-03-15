import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import error from "../../error";
import { tCreateRealEstateRequest, tCreateRealEstateResponse, tlistRealEstate } from "../../interfaces/realEstate.interfaces";

const create = async (estateData: tCreateRealEstateRequest ): Promise<tCreateRealEstateResponse> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)    
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    
    const addressData = estateData.address
    const addressCreated: Address = addressRepository.create(addressData)
    await addressRepository.save(addressCreated)
    
    const categoryData = await categoryRepository.findOneBy({
        id: estateData.categoryId
    }) 

    if(!categoryData) throw new error.AppError('Category not found', 404)

    const realEstate: RealEstate = realEstateRepository.create({...estateData, address: addressCreated, category: categoryData})
    await realEstateRepository.save(realEstate) 

    return realEstate
}

const get = async (): Promise<tlistRealEstate> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)    

    const listRealEstate: Array<RealEstate> = await realEstateRepository.find({
        relations:{
            address: true
        }
    })
    
    return listRealEstate
}

export default {
    create,
    get
}