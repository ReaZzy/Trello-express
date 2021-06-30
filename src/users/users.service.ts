import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserDataDto } from './dto/user-data.dto';
import { hash } from 'bcryptjs';
import { UserIdDto } from './dto/user-id.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDataDto: UserDataDto): Promise<User> {
    const { name, login, password } = userDataDto;
    const hashPassword = await hash(password, 10);
    const user = this.userRepository.create({
      name,
      login,
      password: hashPassword,
    });
    await this.userRepository.save(user);
    return {
      id: user.id,
      name: user.name,
      login: user.login,
    } as User;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(userIdDto: UserIdDto): Promise<User> {
    return this.userRepository.findOne(userIdDto);
  }

  async update(
    userUpdateDto: UserUpdateDto,
    userIdDto: UserIdDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne(userIdDto);
    return this.userRepository.save({
      ...user,
      ...userUpdateDto,
    });
  }

  async delete(userIdDto: UserIdDto): Promise<DeleteResult> {
    return this.userRepository.delete(userIdDto.id);
  }
}
