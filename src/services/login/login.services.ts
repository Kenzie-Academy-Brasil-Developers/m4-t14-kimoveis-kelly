import { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import error from '../../error'
import { tLogin } from '../../interfaces/login.interfaces'
import 'dotenv/config'
import { Repository } from 'typeorm'


const loginService = async (loginData: tLogin): Promise<string> =>{
    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        email: loginData.email
    })

    if(!user) throw new error.AppError('Invalid credentials', 401)

    const passwordMatch: boolean = compareSync(loginData.password, user.password)

    if(!passwordMatch) throw new error.AppError('Invalid credentials', 401)

    const token: string = jwt.sign(
        {
            admin: user.admin
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(user.id)
        }
    )

    return token
}

export{
    loginService
}