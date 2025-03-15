import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IOrderRepository } from '../domain/order.repositoriy';
import { OrderPrimitives } from '../domain/order';
import { OrderId } from '../domain/values-object/order-id';
import { ResourceNotFound } from '../../../shared/errors';

type Input = {
  id: string;
};

@injectable()
export class DeleteOrder implements UseCase<Input, void> {
  constructor(@inject('OrderRepository') private orderRepository: IOrderRepository) {}

  async execute(props: Input): Promise<void> {
    await this.orderRepository.delete(new OrderId(props.id));
  }
}
