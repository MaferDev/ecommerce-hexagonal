import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserEmail } from '../domain/value-objects/user-email';
import { UseCase } from '../../../shared/use-case';

type Input = {
  email: string;
  password: string;
};
@injectable()
export class LoginUser implements UseCase<Input, string> {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute(params: Input): Promise<string> {
    const { email, password } = params;

    const user = await this.userRepository.getByEmail(new UserEmail(email));

    if (!user) {
      throw new Error('Credenciales invalidas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Credenciales invalidas');
    }

    const { JWT_SECRET = '' } = process.env;

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return token;
  }
}
