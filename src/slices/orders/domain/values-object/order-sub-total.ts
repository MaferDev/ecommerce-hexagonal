import { InvalidArgument } from '../../../../shared/errors';
import { ValueObject } from '../../../../shared/value-objects';

export class OrderSubTotal extends ValueObject<number> {
  constructor(value: number) {
    super(value);

    if (value < 0) {
      throw InvalidArgument.create('Order item sub total must be greater than or equal to 0');
    }
  }
}
