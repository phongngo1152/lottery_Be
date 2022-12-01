import { Module } from '@nestjs/common';
import { NumbergenService } from './numbergen.service';
import { NumbergenController } from './numbergen.controller';
import { NumbergenEntity } from './numbergen.entity/numbergen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NumbergenEntity])],
  providers: [NumbergenService],
  controllers: [NumbergenController]
})
export class NumbergenModule {}