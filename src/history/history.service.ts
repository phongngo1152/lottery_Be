import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryEntity } from './history.entity/history.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(HistoryEntity)
        private readonly Hisrepo: Repository<HistoryEntity>,
    ) {}

    async findAll(): Promise<HistoryEntity[]> {
        return await this.Hisrepo.find();
    }

    async findOne(id_user: number, id_ticket: number): Promise<HistoryEntity>{
        return await this.Hisrepo.findOneBy({id_user, id_ticket});
    } 

    async create (history: HistoryEntity): Promise<HistoryEntity> {
        return await this.Hisrepo.save(history);
    }

    async update(history: HistoryEntity): Promise<UpdateResult> {
        return await this.Hisrepo.update(history.id_user, history);
    }

    async delete(id):Promise<DeleteResult> {
        return await this.Hisrepo.delete(id);
    }
}
