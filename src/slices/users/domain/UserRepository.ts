import { CreateUserDTO } from './user.dto';
import { User } from './user.entity';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  create(user: CreateUserDTO): Promise<User>;
}
