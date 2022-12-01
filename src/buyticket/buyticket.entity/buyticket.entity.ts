import { UserEntity } from 'src/user/user.entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class BuyticketEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'float'})
    number: number;

    @Column({type: 'float'})
    price: number;

    @Column()
    id_user: number;

    @Column()
    date: Date;

    @ManyToOne(type => UserEntity, (UserEntity) => UserEntity.id, { cascade: true })
    @JoinColumn({ name: 'id_user' })
    UserEntity!: UserEntity;
}
