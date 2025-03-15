import { ResponseWithPagination } from '../../../shared/dtos/response-with-pagination';
import { SearchDTO } from '../../../shared/dtos/search-pagination.dto';
import { GenericId } from '../../../shared/value-objects';
import { Order } from './order';
import { OrderItem } from './order-item';
import { OrderId } from './values-object/order-id';
export interface IOrderRepository {
  getAll(query: SearchDTO | null): Promise<Order[] | ResponseWithPagination<Order>>;
  getById(id: OrderId): Promise<Order | null>;
  create(order: Order): Promise<Order>;
  delete(id: GenericId): Promise<void>;
  update(order: Order): Promise<void>;
  addItems(items: OrderItem[]): Promise<void>;
  removeItems(items: OrderItem[]): Promise<void>;
  updateItem(item: OrderItem): Promise<void>;
}
