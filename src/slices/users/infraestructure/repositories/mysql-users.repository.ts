import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../domain/user.repository';
import { injectable } from 'tsyringe';
import { UserEmail } from '../../domain/value-objects/user-email';
import { User, UserPrimitives } from '../../domain/user';
import { ResourceNotFound } from '../../../../shared/errors';

type userDb = UserPrimitives;
@injectable()
export class UserRepositoryMysql implements IUserRepository {
  private prisma = new PrismaClient();

  private async getRecordById(id: string): Promise<userDb> {
    const dbRecord = await this.prisma.user.findUnique({ where: { id } });
    if (!dbRecord) {
      throw ResourceNotFound.create('User', { id });
    }

    return dbRecord;
  }
  async getAll(): Promise<User[]> {
    const usersDb: UserPrimitives[] = await this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return usersDb.map((user) => User.fromPrimitives(user));
  }

  async create(entity: User): Promise<User> {
    const newUser = entity.toPrimitives();

    const userDb = await this.prisma.user.create({
      data: newUser,
    });

    return User.fromPrimitives(userDb);
  }

  async getByEmail(email: UserEmail): Promise<User | null> {
    const emailUser = email.value;
    const userDb = await this.prisma.user.findUnique({ where: { email: emailUser } });
    return userDb ? User.fromPrimitives(userDb) : null;
  }

  async getById(id: string): Promise<User> {
    const userDb = await this.getRecordById(id);
    return User.fromPrimitives(userDb);
  }

  async update(entity: User): Promise<void> {
    const user = entity.toPrimitives();
    await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }
}
