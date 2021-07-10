import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import {
  CreateUserType, UserType, DeleteDataTypeTemp, ArrType,
} from '../../types';
import User from './user';

export const getAll = async () => {
  const userRepository = getRepository(User);
  const users = userRepository.find();
  return users;
};

export const getUserById = async (_arr:ArrType, id:string):Promise<UserType | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  if (user) return User.toResponse(user);
  return null;
};

type UpdateUserT = (data:UserType) => Promise<{ name: string; id: string; login: string } | null>;

export const updateUser:UpdateUserT = async (data) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(data.id);
  const updatedUser = await userRepository.save({
    ...user,
    ...data,
  });
  if (updatedUser) return User.toResponse(updatedUser);
  return null;
};

/**
 * Create new user
 * @param {string} name User name
 * @param {string} login User login
 * @param {string} password User password
 * @returns {Promise<User>}
 *
 * @example
 * const task = await createTask(
 * "Fix menu", 1, "qwerty", "dasd-124asd", "34asdas-fds", "dsa5125r-dsadas
 * ")
 */

export const createUser:CreateUserType = async (name, login, password) => {
  const userRepository = getRepository(User);
  const passwordHash = await hash(password, 10);
  const user = userRepository.create({
    login,
    name,
    password: passwordHash,
  });
  await userRepository.save(user);
  if (user) return User.toResponse(user);
  return null;
};

export const deleteUser:DeleteDataTypeTemp = async (_, id) => {
  const userRepository = getRepository(User);
  const deletedUser = await userRepository.delete(id);

  return deletedUser;
};
