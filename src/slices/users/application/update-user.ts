import { inject, injectable } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import bcrypt from 'bcryptjs';
import { IUserRepository } from '../domain/user.repository';
type Input = {
  id: string;
  name?: string;
  password?: string;
};
@injectable()
export class UpdateUser implements UseCase<Input, void> {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}
  async execute(params: Input): Promise<void> {
    const userDb = await this.userRepository.getById(params.id);
    const userToUpdate = userDb;
    if (params.password) {
      const password = await bcrypt.hash(params.password, 10);
      userToUpdate.update({ password });
    }
    if (params.name) {
      userToUpdate.update({ name: params.name });
    }

    await this.userRepository.update(userToUpdate);
  }
}
