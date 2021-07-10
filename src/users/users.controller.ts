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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDataDto } from './dto/user-data.dto';
import { UserIdDto } from './dto/user-id.dto';
import { Response } from 'express';
import { AuthGuard } from '../guards/authGuard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response> {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).send(users);
  }

  @Post()
  async create(
    @Res() res: Response,
    @Body() userData: UserDataDto,
  ): Promise<Response> {
    const user = await this.usersService.create(userData);
    return res.status(HttpStatus.CREATED).send(user);
  }

  @Get(':id')
  async findById(
    @Res() res: Response,
    @Param() userId: UserIdDto,
  ): Promise<Response> {
    const user = await this.usersService.findById(userId);
    if (user) {
      return res.status(HttpStatus.OK).send(user);
    }
    return res.status(HttpStatus.NOT_FOUND).send(user);
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Body() userUpdate: UserDataDto,
    @Param() userId: UserIdDto,
  ): Promise<Response> {
    const user = await this.usersService.update(userUpdate, userId);
    return res.status(HttpStatus.OK).send(user);
  }

  @Delete(':id')
  async delete(
    @Param('id') userId: UserIdDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.usersService.delete(userId);
    if (user) {
      return res
        .status(HttpStatus.NO_CONTENT)
        .send({ msg: 'The user has been deleted' });
    }
    return res.status(HttpStatus.NOT_FOUND).send({ msg: 'User not found' });
  }
}
