import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IProductsRepository } from '../domain/products.repositoriy';
import { ResourceNotFound } from '../../../shared/errors';
import { Product } from '../domain/product';

type Input = {
  id: string;
};

@injectable()
export class DeleteProductById implements UseCase<Input, void> {
  constructor(@inject('ProductRepository') private productRepository: IProductsRepository) {}

  async execute(props: Input): Promise<void> {
    const product: Product | null = await this.productRepository.getById(props.id);

    if (!product) {
      throw ResourceNotFound.create('Product', props);
    }

    await this.productRepository.delete(props.id);
  }
}
