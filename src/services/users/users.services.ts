import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { tCreateUserRequest, tCreateUserResponse, tlistAllUsers, tUpdateUserRequest } from "../../interfaces/users.interfaces";
import { listUserSchema, userCreatedReturnSchema } from "../../schemas/users.schemas";

const create = async (userData: tCreateUserRequest ): Promise<tCreateUserResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)    
    const user: User  = userRepository.create(userData)
    await userRepository.save(user)

    const newUser = userCreatedReturnSchema.parse(user)

    return newUser

}

const get = async (): Promise<tlistAllUsers> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const getUsers: Array<User> = await userRepository.find()
    const users = listUserSchema.parse(getUsers)
    
    return users
}

const update = async (userData: tUpdateUserRequest, userId: number ): Promise<tCreateUserResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
  
    const previousUserData = await userRepository.findOneBy({
        id: userId
    })     
    const userNewData = userRepository.create({
        ...previousUserData,
        ...userData
    })
    await userRepository.save(userNewData)

    const newUser = userCreatedReturnSchema.parse(userNewData)
    return newUser
}

const deleteUser = async (userId: number): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
        where:{
            id: userId
        }
    }) 
    await userRepository.remove(user!)
}

export default { create, get, update, deleteUser }