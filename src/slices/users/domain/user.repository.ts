import { User } from './user';
import { UserEmail } from './value-objects/user-email';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  create(user: User): Promise<User>;
  getByEmail(email: UserEmail): Promise<User | null>;
  getById(id: string): Promise<User>;
  update(user: User): Promise<void>;
}
