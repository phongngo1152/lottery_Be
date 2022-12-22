import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    name: string;

    @Column({ length: 150})
    email: string;

    @Column({ length: 6,default:"xxxxx"})
    password: string;

    @Column({ type:'float',default : 1000})
    money: number;

    @Column({ length: 100,default:"user"})
    role: string;

    
    @Column({type: 'tinyint'})
    status: number;

    

}
