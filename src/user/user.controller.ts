import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserEntity } from './user.entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly UserService: UserService) {}

    @Get()
    findAll(): Promise<UserEntity[]> {
      return this.UserService.findAll()
    }

    @Get(':id')
    get(@Param() params) {
        return this.UserService.findOne(params.id);
    }

    @Post()
    create(@Body() user: UserEntity) {
        return this.UserService.create(user);
    }


    @Put()
    update(@Body() user:UserEntity) {
        return this.UserService.update(user);
    }

    @Delete(':id')
    delete(@Param() params) {
        return this.UserService.delete(params.id);
    }
}
