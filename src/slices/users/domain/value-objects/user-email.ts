import { InvalidArgument } from '../../../../shared/errors';
import { NonEmptyString } from '../../../../shared/value-objects';

export class UserEmail extends NonEmptyString {
  constructor(value: string) {
    super(value);
    if (value.includes('@') === false) {
      throw InvalidArgument.create('Invalid email');
    }
  }
}
