import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import User from '../users/user';

export const userLogin = async (login:string, password:string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ login });
  if (user) {
    if (await compare(password, user.password)) {
      const token = jwt.sign({
        userId: user.id,
        login: user.login,
      }, process.env.JWT_SECRET_KEY!);

      return token;
    }
  }
  return false;
};
