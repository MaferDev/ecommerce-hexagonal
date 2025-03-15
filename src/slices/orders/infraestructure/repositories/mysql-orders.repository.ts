import { injectable } from 'tsyringe';
import { OrderStatus, PrismaClient } from '@prisma/client';
import { IOrderRepository } from '../../domain/order.repositoriy';
import { Order } from '../../domain/order';
import { GenericId } from '../../../../shared/value-objects';
import { OrderItem } from '../../domain/order-item';
import { ResponseWithPagination } from '../../../../shared/dtos/response-with-pagination';
import { SearchDTO } from '../../../../shared/dtos/search-pagination.dto';

@injectable()
export class OrderRepositoryMysql implements IOrderRepository {
  private prisma = new PrismaClient();

  async getAll(query: SearchDTO): Promise<Order[] | ResponseWithPagination<Order>> {
    if (query) {
      const skip = (query.page - 1) * query.perPage;
      const [orders, total] = await this.prisma.$transaction([
        this.prisma.order.findMany({
          skip,
          take: query.perPage,
          orderBy: {
            updatedAt: 'desc', // Ordenar por fecha de creación, puedes cambiarlo
          },
          include: { orderItems: true },
        }),
        this.prisma.order.count(),
      ]);

      return {
        data: orders.map((item) => Order.fromPrimitives(item)),
        total,
        page: query.page,
        per_page: query.perPage,
      };
    }

    // Without pagination

    const items = await this.prisma.order.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      include: { orderItems: true },
    });

    return items.map((item) => Order.fromPrimitives(item));
  }

  async getById(id: GenericId): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id: id.value },
      include: { orderItems: true },
    });

    if (!order) {
      return null;
    }

    return Order.fromPrimitives(order);
  }

  async create(order: Order): Promise<Order> {
    const { orderItems, ...orderEntity } = order.toPrimitives();

    const status = orderEntity.status as OrderStatus;

    await this.prisma.order.create({
      data: { ...orderEntity, status },
    });

    await this.addItems(order.orderItems);

    return order;
  }

  async update(order: Order): Promise<void> {
    const { orderItems, ...orderEntity } = order.toPrimitives();

    const status = orderEntity.status as OrderStatus;

    await this.prisma.order.update({
      where: { id: orderEntity.id },
      data: { ...orderEntity, status },
    });
  }

  async delete(id: GenericId): Promise<void> {
    await this.prisma.order.delete({ where: { id: id.value } });
  }

  async addItems(items: OrderItem[]): Promise<void> {
    const orderItems = items.map((item) => item.toPrimitives());

    await this.prisma.orderItem.createMany({
      data: orderItems,
    });
  }
  async removeItems(items: OrderItem[]): Promise<void> {
    const orderItems = items.map((item) => item.toPrimitives());

    await this.prisma.orderItem.deleteMany({
      where: {
        id: {
          in: orderItems.map((item) => item.id),
        },
      },
    });
  }

  async updateItem(item: OrderItem): Promise<void> {
    const itemEntity = item.toPrimitives();

    await this.prisma.orderItem.update({
      where: { id: itemEntity.id },
      data: itemEntity,
    });
  }
}
