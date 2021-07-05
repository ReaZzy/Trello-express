import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';
import { LoginDataDto } from './dto/login-data.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginData: LoginDataDto, @Res() res: Response) {
    const token = await this.loginService.login(loginData);
    if (!token) {
      return res.status(HttpStatus.FORBIDDEN).send();
    }
    return res.status(HttpStatus.OK).json({ token });
  }
}
