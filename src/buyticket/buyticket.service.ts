import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyticketEntity } from './buyticket.entity/buyticket.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BuyticketService {
    constructor(
        @InjectRepository(BuyticketEntity)
        private readonly Buyrepo: Repository<BuyticketEntity>,
    ) { }

    async findAll(): Promise<BuyticketEntity[]> {
        return await this.Buyrepo.find();
    }

    async findOne(id: number): Promise<BuyticketEntity> {
        return await this.Buyrepo.findOneBy({ id });
    }

   

    async update(User: BuyticketEntity): Promise<UpdateResult> {
        return await this.Buyrepo.update(User.id, User);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.Buyrepo.delete(id);
    }
   
    async create(User: BuyticketEntity): Promise<BuyticketEntity> {
        let lotterys =[]
        for (let index = 0; index < User.quantity; index++) {
                let number_= Math.floor(Math.random() * 899999) + 100000
                    lotterys.push(number_)
        }
        let arr_lottery = lotterys.join()
        console.log(arr_lottery) 
        const posts =
        {
                id:User.id,
                id_user:User.id_user,
                price:User.price,
                quantity:User.quantity,
                number: arr_lottery,
                date:User.date_buy
        }
        console.log("1")
        return this.Buyrepo.save(posts);
    }


}    