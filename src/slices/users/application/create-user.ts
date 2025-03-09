import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../domain/user.repository';
import bcrypt from 'bcryptjs';
import { UseCase } from '../../../shared/use-case';
import { User, UserPrimitives } from '../domain/user';
import { UserEmail } from '../domain/value-objects/user-email';
import { InvalidArgument } from '../../../shared/errors';

type Input = {
  name: string;
  email: string;
  password: string;
};

type Result = Omit<UserPrimitives, 'password'>;

@injectable()
export class CreateUser implements UseCase<Input, Result> {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute(params: Input): Promise<Result> {
    const password = await bcrypt.hash(params.password, 10);
    const userExists = await this.userRepository.getByEmail(new UserEmail(params.email));

    if (userExists) {
      throw InvalidArgument.create('User already exists');
    }
    const user = User.create({
      name: params.name,
      email: params.email,
      password,
    });

    await this.userRepository.create(user);

    const { password: _, ...result } = user.toPrimitives();

    return result;
  }
}
