import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm'
import Address from './addresses.entity'
import Category from './categories.entity'
import Schedule from './schedulesUsersProperties.entity'


@Entity('real_estate')
class RealEstate {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'boolean', default: true })
    sold: boolean

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    value: number | string

    @Column({ type: 'integer' })
    size: number

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn({ nullable:true })
    updatedAt: string 

    @OneToOne(()=> Address)
    @JoinColumn()
    address: Address

    @OneToMany(()=> Schedule, (schedule)=> schedule.realEstate)
    schedules: Schedule[]

    @ManyToOne(()=> Category, (category)=> category.realEstate)
    category: Category
}

export default RealEstate