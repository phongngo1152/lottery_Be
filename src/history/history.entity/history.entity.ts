import { BuyticketEntity } from 'src/buyticket/buyticket.entity/buyticket.entity';
import { UserEntity } from 'src/user/user.entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class HistoryEntity {
    @PrimaryColumn()
    id_user: number;

    @PrimaryColumn()
    id_ticket: number;

    @Column()
    Lottery_prizes: number;

    @Column({ type: "timestamp", default: () => "now()"})
    date_histro: Date;

    @ManyToOne(type => UserEntity, (UserEntity) => UserEntity.id, { cascade: true })
    @JoinColumn({ name: 'id_user' })
    UserEntity!: UserEntity;

    @ManyToOne(type => BuyticketEntity, (BuyticketEntity) => BuyticketEntity.id, { cascade: true })
    @JoinColumn({ name: 'id_ticket' })
    BuyticketEntity!: BuyticketEntity;
}

