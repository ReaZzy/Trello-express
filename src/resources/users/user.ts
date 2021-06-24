import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from '../../types';

@Entity('User')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name:string;

  @Column('varchar', { length: 50 })
  login:string;

  @Column('text')
  password: string;

  static toResponse = (user:UserType) => {
    if ('name' in user && 'login' in user && 'id' in user) {
      const { id, name, login } = user;
      return { id, name, login };
    }
    return null;
  };
}
