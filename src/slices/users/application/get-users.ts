import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { UseCase } from '../../../shared/use-case';

@injectable()
export class GetUsers implements UseCase<void, User[]> {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}
