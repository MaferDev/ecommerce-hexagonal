import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IProductsRepository } from '../domain/products.repositoriy';
import { Product, ProductPrimitives } from '../domain/product';
import { ProductSlug } from '../domain/value-objects/product-slug';
import { InvalidArgument, ResourceNotFound } from '../../../shared/errors';

type Input = {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  stock?: number;
};

@injectable()
export class UpdateProduct implements UseCase<Input, Product> {
  constructor(@inject('ProductRepository') private productRepository: IProductsRepository) {}

  async execute(props: Input): Promise<Product> {
    const product: Product | null = await this.productRepository.getById(props.id);

    if (!product) {
      throw ResourceNotFound.create('Product', { id: props.id });
    }

    product.update(props);

    await this.productRepository.update(product);

    return product;
  }
}
