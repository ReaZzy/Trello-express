import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import User from './user.entity';
import { UserDataDto } from './dto/user-data.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() userDataDto: UserDataDto): Promise<User> {
    return this.usersService.create(userDataDto);
  }

  @Get(':id')
  async findById(@Param() userIdDto: UserIdDto): Promise<User> {
    return this.usersService.findById(userIdDto);
  }

  @Put(':id')
  async update(
    @Body() userUpdateDto: UserUpdateDto,
    @Param() userIdDto: UserIdDto,
  ): Promise<User> {
    return this.usersService.update(userUpdateDto, userIdDto);
  }

  @Delete(':id')
  async delete(@Param() userIdDto: UserIdDto): Promise<DeleteResult> {
    return this.usersService.delete(userIdDto);
  }
}
