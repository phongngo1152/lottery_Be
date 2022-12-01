import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HistoryEntity } from './history.entity/history.entity';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {

    constructor(private readonly HistoryService: HistoryService) {}

    @Get()
    findAll(): Promise<HistoryEntity[]> {
      return this.HistoryService.findAll()
    }

    @Get(':id_user/:id_ticket')
    get(@Param() params) {
        return this.HistoryService.findOne(params.id_user, params.id_ticket);
    }

    @Post()
    create(@Body() user: HistoryEntity) {
        return this.HistoryService.create(user);
    }


    @Put()
    update(@Body() user:HistoryEntity) {
        return this.HistoryService.update(user);
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.HistoryService.delete(params.id);
    }
}
