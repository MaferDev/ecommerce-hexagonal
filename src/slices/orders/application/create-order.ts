import { injectable, inject } from 'tsyringe';
import { IOrderRepository } from '../domain/order.repositoriy';
import { UseCase } from '../../../shared/use-case';
import { Order, OrderPrimitives } from '../domain/order';
import { IProductsRepository } from '../../products/domain/products.repositoriy';
import { OrderUserName } from '../domain/values-object/order-user-name';
import { OrderUserPhone } from '../domain/values-object/order-user-phone';

type Input = {
  userName: string;
  userPhone: string;
  userAddress: string;
  items: {
    id: string;
    quantity: number;
  }[];
};

@injectable()
export class CreateOrder implements UseCase<Input, void> {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
    @inject('ProductRepository') private productRepository: IProductsRepository,
  ) {}

  async execute({ items, userName, userPhone, userAddress }: Input): Promise<void> {
    const productsId = items.map((product) => product.id);
    const products = await this.productRepository.getByIds(productsId);

    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id.value === item.id);
      if (!product) throw new Error(`Producto con ID ${item.id} no encontrado.`);

      return {
        productId: item.id,
        price: product.price.value,
        quantity: item.quantity,
        subtotal: product.price.value * item.quantity,
      };
    });

    const order = Order.create(
      new OrderUserName(userName),
      new OrderUserPhone(userPhone),
      userAddress,
      orderItems,
    );

    await this.orderRepository.create(order);
  }
}
