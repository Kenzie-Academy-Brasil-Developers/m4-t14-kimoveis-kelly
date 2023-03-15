import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Category, RealEstate } from "../../entities"
import error from "../../error"

const get = async (categoryId:number) =>{
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    const findCategory = await categoryRepository.findOneBy({
        id: categoryId
    })
    if(!findCategory) throw new error.AppError('Category not found', 404)
    
    const findRealEstatesInThisCategory = await categoryRepository.findOne({
        where:{
            id: categoryId
        },
        relations:{
            realEstate: true
        }
    })

    return findRealEstatesInThisCategory!
}

export default{
    get
}