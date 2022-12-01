import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class NumbergenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'float'})
    number: number;

    @Column()
    date: Date;

}
