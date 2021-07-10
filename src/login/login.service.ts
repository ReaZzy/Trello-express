import { Injectable } from '@nestjs/common';
import { LoginDataDto } from './dto/login-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../users/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(loginData: LoginDataDto): Promise<string | null> {
    const { login, password } = loginData;
    const user = await this.userRepository.findOne({ login });
    if (user) {
      if (await compare(password, user.password)) {
        return jwt.sign(
          {
            userId: user.id,
            login: user.login,
          },
          process.env.JWT_SECRET_KEY,
        );
      }
    }
  }
}
