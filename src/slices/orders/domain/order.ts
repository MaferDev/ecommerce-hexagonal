import { OrderId } from './values-object/order-id';
import { ToPrimitives } from '../../../shared/custom-types';
import { OrderUserName } from './values-object/order-user-name';
import { OrderUserPhone } from './values-object/order-user-phone';
import { OrderStatus, OrderStatusEnum } from './values-object/order-status';
import { OrderItem, OrderItemPrimitives } from './order-item';
import { NonEmptyString } from '../../../shared/value-objects';

export type OrderPrimitives = ToPrimitives<Order>;

export class Order {
  private constructor(
    public id: OrderId,
    public userName: OrderUserName,
    public userPhone: OrderUserPhone,
    public userAddress: string | null,
    public status: OrderStatus,
    public createdAt: Date,
    public orderItems: OrderItem[],
  ) {}

  static create(
    userName: OrderUserName,
    userPhone: OrderUserPhone,
    userAddress: string,
    orderItem: Omit<OrderItemPrimitives, 'id' | 'createdAt' | 'orderId'>[],
  ): Order {
    const orderId = OrderId.generateUnique();
    const orderItems = orderItem.map((item) =>
      OrderItem.create({ ...item, orderId: orderId.value }),
    );

    return new Order(
      orderId,
      userName,
      userPhone,
      userAddress,
      new OrderStatus(OrderStatusEnum.PENDING),
      new Date(),
      orderItems,
    );
  }

  static fromPrimitives(primitives: OrderPrimitives): Order {
    const orderItems = primitives.orderItems?.map((item) => OrderItem.fromPrimitives(item));

    return new Order(
      new OrderId(primitives.id),
      new OrderUserName(primitives.userName),
      new OrderUserPhone(primitives.userPhone),
      primitives.userAddress,
      new OrderStatus(primitives.status),
      primitives.createdAt,
      orderItems,
    );
  }

  toPrimitives(): OrderPrimitives {
    return {
      id: this.id.value,
      userName: this.userName.value,
      userPhone: this.userPhone.value,
      userAddress: this.userAddress,
      status: this.status.value,
      createdAt: this.createdAt,
      orderItems: this.orderItems?.map((item) => item.toPrimitives()),
    };
  }
}
