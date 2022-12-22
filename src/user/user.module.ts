import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyticketEntity } from '../buyticket/buyticket.entity/buyticket.entity';
import { BuyticketService } from '../buyticket/buyticket.service'
import { NumbergenEntity } from '../numbergen/numbergen.entity/numbergen.entity';
import { NumbergenService } from '../numbergen/numbergen.service';
import { HistoryEntity } from '../history/history.entity/history.entity';
import { HistoryService } from '../history/history.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,BuyticketEntity,NumbergenEntity,HistoryEntity])],
  providers: [UserService,BuyticketService,NumbergenService,HistoryService],
  controllers: [UserController]
})
export class UserModule {}

