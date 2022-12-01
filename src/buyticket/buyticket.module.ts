import { Module } from '@nestjs/common';
import { BuyticketController } from './buyticket.controller';
import { BuyticketService } from './buyticket.service';
import { BuyticketEntity } from './buyticket.entity/buyticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([BuyticketEntity])],
  controllers: [BuyticketController],
  providers: [BuyticketService]
})
export class BuyticketModule {}
