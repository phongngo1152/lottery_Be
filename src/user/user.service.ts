import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { BuyticketService } from '../buyticket/buyticket.service'
import { BuyticketEntity } from '../buyticket/buyticket.entity/buyticket.entity';
import { NumbergenEntity } from '../numbergen/numbergen.entity/numbergen.entity';
import { HistoryEntity } from '../history/history.entity/history.entity';

import { Cron } from '@nestjs/schedule';
import { count } from 'console';
@Injectable()
export class UserService {
    constructor(

        @InjectRepository(UserEntity)
        private readonly Userrepo: Repository<UserEntity>,
        @InjectRepository(BuyticketEntity)
        private readonly Buypo: Repository<BuyticketEntity>,
        @InjectRepository(NumbergenEntity)
        private readonly Numbergenrepo: Repository<NumbergenEntity>,
        @InjectRepository(HistoryEntity)
        private readonly Hisrepo: Repository<HistoryEntity>,
        @InjectDataSource() private datasource: DataSource

    ) { }

    async findAll(): Promise<UserEntity[]> {
        return await this.Userrepo.find();
    }

    async findOne(id: number): Promise<UserEntity> {
        return await this.Userrepo.findOneBy({ id });
    }
    async finduser(email: string): Promise<UserEntity> {
        return await this.Userrepo.findOneBy({ email });
    }

    async create(User: UserEntity): Promise<UserEntity> {
        return await this.Userrepo.save(User);
    }

    async update(User: UserEntity): Promise<UpdateResult> {
        return await this.Userrepo.update(User.id, User);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.Userrepo.delete(id);
    }
    async check_duplicate_name(name: string): Promise<UserEntity[]> {
        console.log(name);
        if (!name) {
            return [];
        }
        console.log('ok');

        let datas = this.datasource.query('select * from task where name = ?', [name]);
        return datas;
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
        console.log('ket qua', a)
        return a
    }
    async total_prize(number_posit: number, number_lotte: string, check: boolean): Promise<number> {

        let da = await this.get_new_numbergen()
        // let arr_number2 = (da).split('')
        let tik = da
        let count = 0
        let arr_number = tik.split('')
        for (let index = number_posit; index < arr_number.length; index++) {
            if (arr_number[index] == number_lotte && index == number_posit && check == true) {

                console.log('trung:', number_lotte, arr_number[index])
                count += 1
            } else {
                console.log('truot:', number_lotte, arr_number[index])

            }

        }
        console.log("Giải thứ:", count)
        return count
    }
    async get_and_split_tk() {
        // const count2 = await this.Buypo.findAndCount({
        //     where:{
        //         id_user: 1
        //     }
        // })

        const datas = await this.datasource
            .getRepository(BuyticketEntity)
            .createQueryBuilder()
            .select("buyticket_entity")
            .from(BuyticketEntity, "buyticket_entity")
            .where("date(buyticket_entity.date_buy) = (SELECT date(date_prize) FROM `numbergen_entity` ORDER by id DESC LIMIT 1) AND time(buyticket_entity.date_buy) < (SELECT time(date_prize) FROM `numbergen_entity` ORDER by id DESC LIMIT 1)")
            .getMany();
        (await datas).forEach(async element => {

            let arr_number_buytk = element.number.split(',')

            let id = element.id_user
            let arr_tk: any = []
            arr_number_buytk.forEach(async (element_1, key) => {
                let check: boolean = true
                let count_tk = 0
                let lottery_number = element_1.split('')
                for (let key = 0; key < 6; key++) {
                    console.log("Giá trị:", lottery_number[key], "Vị trí:", key)
                    let prize = this.total_prize(key, lottery_number[key], check)
                    if (await prize > 0) {
                        console.log("Giải", await prize.valueOf())
                        count_tk += await prize
                    } else {
                        check = false
                    }
                }
                if (count_tk > 0) {
                    arr_tk.push(count_tk)
                    console.log("chuc mung ve ", element_1, "cua nguoi choi so ", element.id_user, " da trung dc giai", count_tk, " ")
                    const posts_his =
                    {
                            id_ticket:element.id,
                            id_user:element.id_user,
                            Lottery_prizes:count_tk
                           
                    }
                    console.log("posts_his",posts_his)
                     this.Hisrepo.save(posts_his)
                } else {
                    console.log("Rat tiec ve ", element_1, "cua nguoi choi so ", element.id_user, " da truot giai", count_tk, " ")
                }
                if (key + 1 == arr_number_buytk.length) {
                    console.log(arr_tk)
                    let arr_ans = arr_tk
                    this.update_user_prize(element.id_user, arr_ans)
                }
              

            });
            console.log("arr_tk", arr_tk)

        });
    }
    async update_user_prize(id_user: number, arr_ans: any) {
        const sum = await this.datasource
            .getRepository(BuyticketEntity)
            .createQueryBuilder("buyticket_entity")
            .select("SUM(buyticket_entity.quantity * buyticket_entity.price)", "sum")
            .where("buyticket_entity.id_user = :id and date(buyticket_entity.date_buy) = (SELECT date(date_prize) FROM `numbergen_entity` ORDER by id DESC LIMIT 1) AND time(buyticket_entity.date_buy) < (SELECT time(date_prize) FROM `numbergen_entity` ORDER by id DESC LIMIT 1)", { id: id_user })
            .getRawOne();

        const sum_price_tk = await this.datasource
            .getRepository(BuyticketEntity)
            .createQueryBuilder("buyticket_entity")
            .select("SUM(buyticket_entity.quantity * buyticket_entity.price)", "sum_tt")
            .where("date(buyticket_entity.date_buy) = (SELECT date(date_prize) FROM `numbergen_entity` ORDER by id DESC LIMIT 1)AND time(buyticket_entity.date_buy) < (SELECT time(date_prize) FROM `numbergen_entity` ORDER by id DESC LIMIT 1)")
            .getRawOne();

        let user = await this.Userrepo.findOneBy({ id: id_user })
        let check_prize = false
        let precent = 0
        if (arr_ans.length > 0) {
            check_prize = true
        }
        console.log("arr_ans", arr_ans)
        arr_ans.forEach(element => {
            if (element == 1) {
                precent += 0.02

            }
            if (element == 2) {
                precent += 0.03
            }
            if (element == 3) {
                precent += 0.05
            }
            if (element == 4) {
                precent += 0.1
            }
            if (element == 5) {
                precent += 0.2
            }
            if (element == 6) {
                precent += 0.4
            }
        });


        console.log("precent", precent)
        console.log("trước khi sửa", user);
        const posts = {
            id: user.id,
            name: user.name,
            email: user.email,
            status: check_prize ? 1 : 0,
            role:user.role,
            password:user.password,
            money: user.money - sum.sum + sum_price_tk.sum_tt * precent
        }
        console.log('sau khi sửa', posts.money)
        user = posts
        await this.Userrepo.update(user.id, posts)

        console.log('sum:', sum)
        console.log('sum:', sum_price_tk)
    }
    @Cron('15 * * * * *')
    async handleCron() {
        console.log(this.get_and_split_tk())
    }

}
