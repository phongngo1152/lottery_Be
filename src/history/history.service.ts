import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { HistoryEntity } from './history.entity/history.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class HistoryService {
    constructor(
        @InjectDataSource() private datasource: DataSource,
        @InjectRepository(HistoryEntity)
        private readonly Hisrepo: Repository<HistoryEntity>,
    ) {}

    async findAll(): Promise<HistoryEntity[]> {
        return await this.Hisrepo.find();
    }

    async findOne(id_user: number, id_ticket: number): Promise<HistoryEntity>{
        return await this.Hisrepo.findOneBy({id_user, id_ticket});
    } 
    async findMany(id_user: number): Promise<HistoryEntity[]>{
        return await this.Hisrepo.find({
                where:{
                    id_user:id_user
                }
            })
        
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
    async findhis(prize:number): Promise<HistoryEntity[]> {
        console.log("Debug 1")
        const his = await this.datasource
            .getRepository(HistoryEntity)
            .createQueryBuilder("HistoryEntity")
            .select("count(HistoryEntity.Lottery_prizes)", "count_tt")
            .where("date(HistoryEntity.date_histro) = (SELECT date(date_prize) FROM `numbergen_entity` ORDER by id DESC LIMIT 1)AND HistoryEntity.Lottery_prizes = :prizes",{prizes:prize})
            .getRawOne();
        console.log(his);
        return his
    }
}
