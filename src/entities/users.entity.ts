import { getRounds, hashSync } from 'bcryptjs'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert, BeforeUpdate, OneToMany} from 'typeorm'
import Schedule from './schedulesUsersProperties.entity'

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ length: 45 })
    name: string

    @Column({ length: 45, unique: true })
    email: string

    @Column({ length: 120 })
    password: string

    @Column({ type: 'boolean', default: false })
    admin: boolean

    @CreateDateColumn({ type: 'date' })
    createdAt: string

    @UpdateDateColumn({type: 'date', nullable:true })
    updatedAt: string 

    @DeleteDateColumn({ type: 'date', nullable:true })
    deletedAt: string

    @OneToMany(()=> Schedule, (schedule)=> schedule.user)
    schedules: Schedule[]
    
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isEncrypted = getRounds(this.password)
        if(!isEncrypted) this.password = hashSync(this.password, 10)
    }
    
}

export default User