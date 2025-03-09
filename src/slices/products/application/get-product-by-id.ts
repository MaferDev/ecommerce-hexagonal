import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IProductsRepository } from '../domain/products.repositoriy';
import { Product } from '../domain/product';
import { ResourceNotFound } from '../../../shared/errors';

type Input = {
  id: string;
};

@injectable()
export class GetProductById implements UseCase<Input, Product> {
  constructor(@inject('ProductRepository') private productRepository: IProductsRepository) {}

  async execute(props: Input): Promise<Product> {
    const product = await this.productRepository.getById(props.id);

    if (!product) {
      throw ResourceNotFound.create('Product', props);
    }

    return product;
  }
}
