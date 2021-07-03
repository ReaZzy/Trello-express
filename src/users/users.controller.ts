import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import User from './user.entity';
import { UserDataDto } from './dto/user-data.dto';
import { UserIdDto } from './dto/user-id.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() userData: UserDataDto): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get(':id')
  async findById(@Param() userId: UserIdDto): Promise<User> {
    return this.usersService.findById(userId);
  }

  @Put(':id')
  async update(
    @Body() userUpdate: UserDataDto,
    @Param() userId: UserIdDto,
  ): Promise<User> {
    return this.usersService.update(userUpdate, userId);
  }

  @Delete(':id')
  async delete(@Param() userId: UserIdDto, @Res() res: Response) {
    const user = await this.usersService.delete(userId);
    if (user) {
      return res
        .status(HttpStatus.NO_CONTENT)
        .json({ msg: 'The user has been deleted' });
    }
    return res.status(HttpStatus.NOT_FOUND).json({ msg: 'User not found' });
  }
}
