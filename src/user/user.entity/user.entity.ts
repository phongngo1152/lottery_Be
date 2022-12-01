import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    name: string;

    @Column({ length: 150})
    email: string;

    @Column({ type:'float'})
    phone: number;

    @Column({ type:'float',default : 1000})
    money: number;

    @Column ({ length: 100})
    password: string;
    
    @Column({type: 'tinyint'})
    status: string;

    @Column()
    Lottery_prizes: number;

}
