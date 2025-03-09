import { InvalidArgument } from '../../../../shared/errors';
import { ValueObject } from '../../../../shared/value-objects';

// type PriceProps = { amount: number; currency: 'PEN' | 'USD' };

export class Price extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    if (value < 0) throw InvalidArgument.create(`Prices should positive`);
  }
}
