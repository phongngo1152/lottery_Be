import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NumbergenEntity } from './numbergen.entity/numbergen.entity';
import { NumbergenService } from './numbergen.service';

@Controller('numbergen')
export class NumbergenController {

    constructor(private readonly NumbergenService: NumbergenService) {}

    @Get()
    findAll(): Promise<NumbergenEntity[]> {
      return this.NumbergenService.findAll()
    }

    @Get('number_new/:id')
    get(@Param() params) {
        return this.NumbergenService.findOne(params.id);
    }

    @Get('number_new')
    get_number(@Param() params) {
        return this.NumbergenService.get_new_numbergen();
    }
    @Post()
    create(@Body() user: NumbergenEntity) {
        return this.NumbergenService.create(user);
    }


    @Put()
    update(@Body() user:NumbergenEntity) {
        return this.NumbergenService.update(user);
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.NumbergenService.delete(params.id);
    }
}
