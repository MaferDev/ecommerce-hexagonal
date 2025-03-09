import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IProductsRepository } from '../domain/products.repositoriy';
import { Product } from '../domain/product';
import { ProductSlug } from '../domain/value-objects/product-slug';
import { InvalidArgument } from '../../../shared/errors';

type Input = {
  name: string;
  price: number;
  description: string;
  stock: number;
};

@injectable()
export class CreateProduct implements UseCase<Input, Product> {
  constructor(@inject('ProductRepository') private productRepository: IProductsRepository) {}

  async execute(props: Input): Promise<Product> {
    const slug = new ProductSlug(props.name);
    const existingProduct = await this.productRepository.getBySlug(slug.value);
    if (existingProduct) {
      throw InvalidArgument.create('Producto con el mismo nombre ya existe', { name: props.name });
    }

    const product = Product.create(props);

    await this.productRepository.create(product);

    return product;
  }
}
