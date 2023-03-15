import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import error from "../../error";
import { tCreateCategoryRequest, tCreateCategoryResponse, tListCategory } from "../../interfaces/category.interfaces";


const create = async (categoryData: tCreateCategoryRequest): Promise<tCreateCategoryResponse> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    
    const categoryName = await categoryRepository.findOneBy({
        name: categoryData.name
    }) 
    
    if(categoryName) throw new error.AppError('Category already exists', 409)

    const categorycreated: tCreateCategoryResponse = categoryRepository.create(categoryData)
    await categoryRepository.save(categorycreated)

    return categorycreated
}  

const get = async (): Promise<tListCategory> =>{
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    const allCategories: Array<Category> = await categoryRepository.find()
    
    return allCategories
}

export default{
    create,
    get
}