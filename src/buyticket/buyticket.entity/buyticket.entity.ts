import { UserEntity } from 'src/user/user.entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class BuyticketEntity {
    static createQueryBuilder(arg0: string) {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column({type: 'float',default:"1.5"})
    price: number;

    @Column()
    id_user: number;

    
    @Column()
    quantity: number;

    @Column({ type: "timestamp", default: () => "now()"})
    date_buy: Date;

    @ManyToOne(type => UserEntity, (UserEntity) => UserEntity.id, { cascade: true })
    @JoinColumn({ name: 'id_user' })
    UserEntity!: UserEntity;
}
