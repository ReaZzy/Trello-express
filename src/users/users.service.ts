import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
import { UserDataDto } from './dto/user-data.dto';
import { hash } from 'bcryptjs';
import { UserIdDto } from './dto/user-id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: UserDataDto): Promise<User> {
    const { name, login, password } = userData;
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

  async findById(userId: UserIdDto): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async update(userUpdate: UserDataDto, userId: UserIdDto): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    const updatedUser = await this.userRepository.save({
      ...user,
      ...userUpdate,
    });
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      login: updatedUser.login,
    } as User;
  }

  async delete(userId: UserIdDto): Promise<boolean> {
    const user = await this.userRepository.delete(userId);
    return !!user;
  }
}
