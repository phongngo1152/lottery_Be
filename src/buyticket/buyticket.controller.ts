import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BuyticketEntity } from './buyticket.entity/buyticket.entity';
import { BuyticketService } from './buyticket.service';

@Controller('buyticket')
export class BuyticketController {

    constructor(private readonly BuyticketService: BuyticketService) {}

    @Get()
    findAll(): Promise<BuyticketEntity[]> {
      return this.BuyticketService.findAll()
    }

    @Get(':id')
    get(@Param() params) {
        return this.BuyticketService.findOne(params.id);
    }

    @Post()
    create(@Body() buyticket: BuyticketEntity) {
        return this.BuyticketService.create(buyticket);
    }


    @Put()
    update(@Body() buyticket:BuyticketEntity) {
        return this.BuyticketService.update(buyticket);
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.BuyticketService.delete(params.id);
    }
}
