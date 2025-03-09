import { InvalidArgument } from '../../../../shared/errors';
import { NonEmptyString } from '../../../../shared/value-objects';

export class ProductName extends NonEmptyString {
  constructor(value: string) {
    super(value);
    if (value.length <= 3)
      throw InvalidArgument.create(
        `Invalid ProductName argument of '${value}'. Length should be greater than 3`,
      );
  }
}
