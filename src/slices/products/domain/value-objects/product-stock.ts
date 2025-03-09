import { InvalidArgument } from '../../../../shared/errors';
import { ValueObject } from '../../../../shared/value-objects';

export class ProductStock extends ValueObject<number> {
  constructor(value: number) {
    super(value);

    if (value < 0) {
      throw InvalidArgument.create('Product stock cannot be negative');
    }
  }
}
