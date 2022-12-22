import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { NumbergenEntity } from './numbergen.entity/numbergen.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';


@Injectable()
export class NumbergenService {
    constructor(
        @InjectDataSource() private datasource: DataSource,
        @InjectRepository(NumbergenEntity)

        private readonly Numbergenrepo: Repository<NumbergenEntity>, private schedulerRegistry: SchedulerRegistry
    ) { }

    async findAll(): Promise<NumbergenEntity[]> {
        return await this.Numbergenrepo.find();
    }

    async findOne(id: number): Promise<NumbergenEntity> {
        return await this.Numbergenrepo.findOneBy({ id });
    }

    async create(Numbergen: NumbergenEntity): Promise<NumbergenEntity> {
        return await this.Numbergenrepo.save(Numbergen);
    }

    async update(Numbergen: NumbergenEntity): Promise<UpdateResult> {
        return await this.Numbergenrepo.update(Numbergen.id, Numbergen);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.Numbergenrepo.delete(id);
    }
    async get_new_numbergen(): Promise<string> {
        let arr_prize = []
        const number_lt = await this.datasource
            .getRepository(NumbergenEntity)
            .createQueryBuilder("numbergen_entity")
            .select("numbergen_entity.number", "number_lt")
            .orderBy("numbergen_entity.id", "DESC")
            .limit(1)
            .getRawOne()
            arr_prize.push(number_lt.number_lt)
            let a = arr_prize.join('')
         
        return a
    }

    @Cron('0 * * * * *', {
        name: 'notifications',
    })
    handleCron() {
        const posts =
        {
            number: Math.floor(Math.random() * 899999) + 100000
        }
        console.log("Kết Quả xỏ số:", posts.number)
        return this.Numbergenrepo.save(posts);

    }
    triggerNotifications() {
        const job = this.schedulerRegistry.getCronJob('notifications');
        job.stop();

    }
} 
