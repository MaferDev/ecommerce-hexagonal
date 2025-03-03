import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { UseCase } from '../../../shared/use-case';

type Input = {
  id: string;
};
@injectable()
export class GetUserById implements UseCase<Input, User> {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  execute(props: Input): Promise<User> {
    return this.userRepository.getById(props.id);
  }
}
