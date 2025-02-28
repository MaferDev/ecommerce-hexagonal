import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/UserRepository';

@injectable()
export class GetUsers {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  execute() {
    return this.userRepository.getAllUsers();
  }
}
