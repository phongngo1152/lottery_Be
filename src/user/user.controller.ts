import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
    @Get(':email')
    get_email(@Param() params) {
        return this.UserService.finduser(params.email);
    }

    // @Post()
    // create(@Query('user') user: UserEntity) {
    //     return this.UserService.create(user);
    // }
    @Post(':check_login')
    check_login(@Query('email') email: string) {
        return this.UserService.finduser(email);
    }

    @Post()
    create(@Query('name') name: string,@Query('email') email: string) {
      
        let user:UserEntity ={
            name: name,
            email: email,
            id: 0,
            money: 1000,
            status: 0,
            role: 'user',
            password: 'xxxxxx'
        }
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
