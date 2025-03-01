import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/UserRepository';
import { CreateUserDTO } from '../domain/user.dto';
import { User } from '../domain/user.entity';

@injectable()
export class CreateUser {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  execute(user: CreateUserDTO): Promise<User> {
    return this.userRepository.create(user);
  }
}
