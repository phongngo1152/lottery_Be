import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

export class NumbergenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'float'})
    number: number;

    @Column({ type: "timestamp", default: () => "now()"})
    date_prize: Date;

}
