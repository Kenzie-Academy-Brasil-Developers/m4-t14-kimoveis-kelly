import { isWeekend } from "date-fns";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import error from "../../error";
import { tScheduleRequest } from "../../interfaces/schedule.interfaces";

const create = async (scheduleData: tScheduleRequest, userId: number) => {
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)    
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const realEstateId = Number(scheduleData.realEstateId) 
    const realEstateExists: RealEstate|null = await realEstateRepository.findOneBy({
            id: realEstateId
    }) 
        if(!realEstateExists) throw new error.AppError('RealEstate not found', 404)

    const userLogged =  await userRepository.findOneBy({
        id: userId
    })
    const ensureUserDontSchedule = await scheduleRepository.createQueryBuilder('schedules_users_properties')
        .where('schedules_users_properties.userId = :userId', {userId})
        .andWhere('schedules_users_properties.hour = :hour', {hour: scheduleData.hour})
        .andWhere('schedules_users_properties.date = :date', {date: scheduleData.date})
        .getOne();

        if(ensureUserDontSchedule) throw new error.AppError('User schedule to this real estate at this date and time already exists', 409)    

    const ensureScheduleDontExists = await scheduleRepository.createQueryBuilder('schedules_users_properties')
        .where('schedules_users_properties.realEstateId = :realEstateId', {realEstateId: scheduleData.realEstateId})
        .andWhere('schedules_users_properties.hour = :hour', {hour: scheduleData.hour})
        .andWhere('schedules_users_properties.date = :date', {date: scheduleData.date})
        .getOne();

        if(ensureScheduleDontExists) throw new error.AppError('Schedule to this real estate at this date and time already exists', 409)
    
    const time = scheduleData.hour
    const [hour, minute] = time.split(":").map(parseInt) /* Aqui eu faço um split primeiro e depois faço um map para formatar os valores para número */
        
        if (hour < 8 || hour >= 18 || minute < 0 || minute >= 60) throw new error.AppError("Invalid hour, available times are 8AM to 18PM", 400)

    const date = scheduleData.date
    const isNotWorkDays = isWeekend(new Date(date)) /* estou usando a lib date-fns */
        
        if (isNotWorkDays) throw new error.AppError('Invalid date, work days are monday to friday', 400);
    
    const newScheduleCreated = scheduleRepository.create({
        ...scheduleData,
        realEstate: realEstateExists,
        user: userLogged!
    })
    await scheduleRepository.save(newScheduleCreated)
    
    return { message: 'Schedule created' }
}


const get = async (realEstateId: number) => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)    
    
    const selectRealEstateAndSchedules = await realEstateRepository.createQueryBuilder("realEstate")
        .innerJoinAndSelect('realEstate.address', 'address')
        .leftJoinAndSelect('realEstate.category', 'category')
        .leftJoinAndSelect('realEstate.schedules', 'schedule')
        .leftJoinAndSelect('schedule.user', 'user.id')
    
        .where('realEstate.id = :id', {id: realEstateId})
        .getOne();
    if(!selectRealEstateAndSchedules) throw new error.AppError('RealEstate not found', 404)
    return selectRealEstateAndSchedules
}

export default {
    create,
    get
}