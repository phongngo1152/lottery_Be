import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly Userrepo: Repository<UserEntity>,
    @InjectDataSource() private datasource: DataSource

    ) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.Userrepo.find();
    }

    async findOne(id: number): Promise<UserEntity>{
        return await this.Userrepo.findOneBy({id});
    } 

    async create (User: UserEntity): Promise<UserEntity> {
        return await this.Userrepo.save(User);
    }

    async update(User: UserEntity): Promise<UpdateResult> {
        return await this.Userrepo.update(User.id, User);
    }

    async delete(id):Promise<DeleteResult> {
        return await this.Userrepo.delete(id);
    }
    async checkDuplicateName(name: string): Promise<UserEntity[]>{
        console.log(name);
        if(!name) {
          return [];
        }
        console.log('ok');
        
        let datas = this.datasource.query('select * from task where name = ?', [name]);
        return datas;
      }
}
