import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyticketEntity } from './buyticket.entity/buyticket.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class BuyticketService {
    constructor(
        @InjectRepository(BuyticketEntity)
        private readonly Buyrepo: Repository<BuyticketEntity>,
    ) {}

    async findAll(): Promise<BuyticketEntity[]> {
        return await this.Buyrepo.find();
    }

    async findOne(id: number): Promise<BuyticketEntity>{
        return await this.Buyrepo.findOneBy({id});
    } 

    async create (User: BuyticketEntity): Promise<BuyticketEntity> {
        return await this.Buyrepo.save(User);
    }

    async update(User: BuyticketEntity): Promise<UpdateResult> {
        return await this.Buyrepo.update(User.id, User);
    }

    async delete(id):Promise<DeleteResult> {
        return await this.Buyrepo.delete(id);
    }

}    