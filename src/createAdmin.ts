import { getRepository } from 'typeorm';
import User from './users/user.entity';

export const createAdmin = async (): Promise<void> => {
  const userRepository = getRepository(User);
  await userRepository.save({
    login: 'admin',
    name: 'admin',
    password: '$2b$10$w9oRv2BKug/VZcTxajBQSOKwN0/HmHmeILNjmMG1AQmmvohpm.rOW',
  });
};
