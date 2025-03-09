import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IProductsRepository } from '../domain/products.repositoriy';
import { Product } from '../domain/product';

@injectable()
export class GetProducts implements UseCase<void, Product[]> {
  constructor(@inject('ProductRepository') private productRepository: IProductsRepository) {}

  execute(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}
