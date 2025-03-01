import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../domain/UserRepository';
import { injectable } from 'tsyringe';
import { User } from '../domain/user.entity';
import { CreateUserDTO } from '../domain/user.dto';
@injectable()
export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();
  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
