import { User } from './user.entity';

export type CreateUserDTO = Pick<User, 'name' | 'email' | 'password'>;
