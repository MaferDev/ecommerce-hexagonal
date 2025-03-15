import { ToPrimitives } from '../../../shared/custom-types';
import { GenericId } from '../../../shared/value-objects';
import { OrderId } from '../../orders/domain/values-object/order-id';
import { Price } from '../../products/domain/value-objects/price';
import { ProductId } from '../../products/domain/value-objects/product-id';
import { OrderSubTotal } from './values-object/order-sub-total';

export type OrderItemPrimitives = ToPrimitives<OrderItem>;
export class OrderItem {
  private constructor(
    public id: GenericId,
    public orderId: OrderId,
    public productId: ProductId,
    public price: Price,
    public quantity: number,
    public subtotal: OrderSubTotal,
    public createdAt: Date,
  ) {}

  static create(params: Omit<OrderItemPrimitives, 'id' | 'createdAt'>): OrderItem {
    return new OrderItem(
      GenericId.generateUnique(),
      new OrderId(params.orderId),
      new ProductId(params.productId),
      new Price(params.price),
      params.quantity,
      new OrderSubTotal(params.subtotal),
      new Date(),
    );
  }

  static fromPrimitives(primitives: OrderItemPrimitives): OrderItem {
    return new OrderItem(
      new GenericId(primitives.id),
      new OrderId(primitives.orderId),
      new ProductId(primitives.productId),
      new Price(primitives.price),
      primitives.quantity,
      new OrderSubTotal(primitives.subtotal),
      primitives.createdAt,
    );
  }

  update(props: Partial<Omit<OrderItemPrimitives, 'id' | 'createdAt'>>): void {
    if (props.productId) this.productId = new ProductId(props.productId);

    if (props.quantity) this.quantity = props.quantity;

    if (props.subtotal) this.subtotal = new OrderSubTotal(props.subtotal);

    if (props.price) this.price = new Price(props.price);
  }

  toPrimitives(): OrderItemPrimitives {
    return {
      id: this.id.value,
      orderId: this.orderId.value,
      productId: this.productId.value,
      price: this.price.value,
      quantity: this.quantity,
      subtotal: this.subtotal.value,
      createdAt: this.createdAt,
    };
  }
}
