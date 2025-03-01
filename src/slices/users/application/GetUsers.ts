import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/UserRepository';
import { User } from '../domain/user.entity';

@injectable()
export class GetUsers {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
