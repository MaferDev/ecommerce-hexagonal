import { ToPrimitives } from '../../../shared/custom-types';
import { NonEmptyString } from '../../../shared/value-objects';
import { UserEmail } from './value-objects/user-email';
import { UserId } from './value-objects/user-id';

export type UserPrimitives = ToPrimitives<User>;
export class User {
  private constructor(
    public id: UserId,
    public name: NonEmptyString,
    public email: UserEmail,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date = new Date(),
  ) {}

  static create(params: Omit<UserPrimitives, 'id' | 'createdAt' | 'updatedAt'>): User {
    return new User(
      UserId.generateUnique(),
      new NonEmptyString(params.name),
      new UserEmail(params.email),
      params.password,
      new Date(),
    );
  }

  static fromPrimitives(primitives: UserPrimitives): User {
    return new User(
      new UserId(primitives.id),
      new NonEmptyString(primitives.name),
      new UserEmail(primitives.email),
      primitives.password,
      primitives.createdAt,
    );
  }

  update(params: Partial<Omit<UserPrimitives, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (params.name) this.name = new NonEmptyString(params.name);
    if (params.email) this.email = new UserEmail(params.email);
    if (params.password) this.password = params.password;
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
