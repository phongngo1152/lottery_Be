import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NumbergenEntity } from './numbergen.entity/numbergen.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class NumbergenService {    constructor(
    @InjectRepository(NumbergenEntity)
    private readonly Numbergenrepo: Repository<NumbergenEntity>,
) {}

async findAll(): Promise<NumbergenEntity[]> {
    return await this.Numbergenrepo.find();
}

async findOne(id: number): Promise<NumbergenEntity>{
    return await this.Numbergenrepo.findOneBy({id});
} 

async create (Numbergen: NumbergenEntity): Promise<NumbergenEntity> {
    return await this.Numbergenrepo.save(Numbergen);
}

async update(Numbergen: NumbergenEntity): Promise<UpdateResult> {
    return await this.Numbergenrepo.update(Numbergen.id, Numbergen);
}

async delete(id):Promise<DeleteResult> {
    return await this.Numbergenrepo.delete(id);
}}
