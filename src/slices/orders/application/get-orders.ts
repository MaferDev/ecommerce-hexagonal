import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IOrderRepository } from '../domain/order.repositoriy';
import { Order } from '../domain/order';
import { OutputOrder } from './get-order-by-id';
import { IProductsRepository } from '../../products/domain/products.repositoriy';
import { ResponseWithPagination } from '../../../shared/dtos/response-with-pagination';
import { SearchDTO } from '../../../shared/dtos/search-pagination.dto';

type Input = SearchDTO;

@injectable()
export class GerOrders
  implements UseCase<Input, OutputOrder[] | ResponseWithPagination<OutputOrder>>
{
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
    @inject('ProductRepository') private productRepository: IProductsRepository,
  ) {}

  async execute(props: Input): Promise<OutputOrder[] | ResponseWithPagination<OutputOrder>> {
    if (props.page && props.perPage) {
      const response = (await this.orderRepository.getAll(props)) as ResponseWithPagination<Order>;

      const result = await this.mapOrderWithProduct(response.data);
      return {
        ...response,
        data: result,
      };
    }

    const orders = (await this.orderRepository.getAll(null)) as Order[];

    const result = await this.mapOrderWithProduct(orders);
    return result;
  }

  private async mapOrderWithProduct(orders: Order[]): Promise<OutputOrder[]> {
    const orderWithProducts: OutputOrder[] = [];

    for (const order of orders) {
      const orderPrimitive = order.toPrimitives();

      const orderWithProduct: OutputOrder = {
        ...orderPrimitive,
        orderItems: [],
      };

      const productIds = orderPrimitive.orderItems.map((item) => item.productId);

      const products = await this.productRepository.getByIds(productIds);

      orderWithProduct.orderItems = orderPrimitive.orderItems.map((item) => {
        const product = products.find((product) => product.id.value === item.productId);

        return {
          ...item,
          productName: product?.name.value ?? 'Product not found',
        };
      });

      orderWithProducts.push(orderWithProduct);
    }

    return orderWithProducts;
  }
}
