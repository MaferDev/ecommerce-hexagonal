import { injectable, inject } from 'tsyringe';
import { IOrderRepository } from '../domain/order.repositoriy';
import { UseCase } from '../../../shared/use-case';
import { Order, OrderPrimitives } from '../domain/order';
import { IProductsRepository } from '../../products/domain/products.repositoriy';
import { OrderUserName } from '../domain/values-object/order-user-name';
import { OrderUserPhone } from '../domain/values-object/order-user-phone';
import { OrderId } from '../domain/values-object/order-id';
import { OrderItem } from '../domain/order-item';

type Input = {
  id: string;
  status: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  items: {
    id: string;
    quantity: number;
  }[];
};

@injectable()
export class UpdateOrder implements UseCase<Input, OrderPrimitives> {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
    @inject('ProductRepository') private productRepository: IProductsRepository,
  ) {}

  async execute({ items, userName, userPhone, userAddress, id }: Input): Promise<OrderPrimitives> {
    const productsId = items.map((product) => product.id);

    const products = await this.productRepository.getByIds(productsId);

    const orderDb = await this.orderRepository.getById(new OrderId(id));
    const orderItemsDb = orderDb?.orderItems || [];

    const { toAdd, toRemove, toUpdate } = this.filterOrderItems(orderItemsDb, items);

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

    return order.toPrimitives();
  }

  private filterOrderItems(
    currentItems: OrderItem[],
    newItems: { id: string; quantity: number }[],
  ): {
    toAdd: { id: string; quantity: number }[];
    toRemove: OrderItem[];
    toUpdate: { id: string; quantity: number }[];
  } {
    const orderItemsDbIds = currentItems.map((item) => item.productId.value);
    const newItemsIds = newItems.map((item) => item.id);

    const itemsToRemove = orderItemsDbIds.filter((id) => !newItemsIds.includes(id));
    const itemsToAdd = newItemsIds.filter((id) => !orderItemsDbIds.includes(id));
    const itemsToUpdate = newItemsIds.filter((id) => orderItemsDbIds.includes(id));

    return {
      toAdd: newItems.filter((item) => itemsToAdd.includes(item.id)),
      toRemove: currentItems.filter((item) => itemsToRemove.includes(item.productId.value)),
      toUpdate: newItems.filter((item) => itemsToUpdate.includes(item.id)),
    };
  }
}
