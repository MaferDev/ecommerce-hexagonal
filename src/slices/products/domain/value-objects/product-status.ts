import { NonEmptyString } from '../../../../shared/value-objects';

export class ProductStatus extends NonEmptyString {
  constructor(value: string) {
    const status = ProductStatusEnum[value as keyof typeof ProductStatusEnum];

    if (!status) {
      throw new Error('Invalid product status');
    }

    super(status);
  }
}

export enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
