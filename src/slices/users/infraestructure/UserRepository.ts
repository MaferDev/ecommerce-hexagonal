import { IUserRepository } from '../domain/UserRepository';
import { injectable } from 'tsyringe';
@injectable()
export class UserRepository implements IUserRepository {
  getAllUsers() {
    return [{ id: 1, name: 'Mary Fernanda' }];
  }
}
