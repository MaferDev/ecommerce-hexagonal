import { NonEmptyString } from '../../../../shared/value-objects';

export class OrderStatus extends NonEmptyString {
  constructor(value: string) {
    const status = OrderStatusEnum[value as keyof typeof OrderStatusEnum];
    if (!status) {
      throw new Error('Invalid order status');
    }

    super(status);
  }
}

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  NOTIFIED = 'NOTIFIED',
}
