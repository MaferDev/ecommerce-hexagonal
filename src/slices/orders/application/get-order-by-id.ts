import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IOrderRepository } from '../domain/order.repositoriy';
import { OrderPrimitives } from '../domain/order';
import { OrderId } from '../domain/values-object/order-id';
import { ResourceNotFound } from '../../../shared/errors';
import { IProductsRepository } from '../../products/domain/products.repositoriy';
import { OrderItemPrimitives } from '../domain/order-item';

type Input = {
  id: string;
};

export type OutputOrder = OrderPrimitives & {
  orderItems: OrderItemWithProduct[];
};

type OrderItemWithProduct = OrderItemPrimitives & {
  productName: string;
};

@injectable()
export class GerOrderById implements UseCase<Input, OutputOrder> {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
    @inject('ProductRepository') private productRepository: IProductsRepository,
  ) {}

  async execute(props: Input): Promise<OutputOrder> {
    const order = await this.orderRepository.getById(new OrderId(props.id));

    if (!order) {
      throw ResourceNotFound.create('Order', { id: props.id });
    }

    const orderPrimitive = order.toPrimitives();

    const orderWithProduct: OrderItemWithProduct[] = [];

    await Promise.all(
      orderPrimitive.orderItems.map(async (item) => {
        const product = await this.productRepository.getById(item.productId);

        if (!product) return null;

        orderWithProduct.push({
          ...item,
          productName: product.name.value,
        });
      }),
    );

    return {
      ...orderPrimitive,
      orderItems: orderWithProduct,
    };
  }
}
