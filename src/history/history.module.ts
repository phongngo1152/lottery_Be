import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryEntity } from './history.entity/history.entity';
import { HistoryService } from './history.service';

@Module({
  imports : [TypeOrmModule.forFeature([HistoryEntity])],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
