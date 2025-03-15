import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../shared/use-case';
import { IProductsRepository } from '../domain/products.repositoriy';
import { Product, ProductPrimitives } from '../domain/product';
import { SearchDTO } from '../../../shared/dtos/search-pagination.dto';
import { ResponseWithPagination } from '../../../shared/dtos/response-with-pagination';

type Input = SearchDTO;
@injectable()
export class GetProducts
  implements UseCase<Input, ProductPrimitives[] | ResponseWithPagination<ProductPrimitives>>
{
  constructor(@inject('ProductRepository') private productRepository: IProductsRepository) {}

  async execute(
    props: Input,
  ): Promise<ProductPrimitives[] | ResponseWithPagination<ProductPrimitives>> {
    if (props.page && props.perPage) {
      const response = (await this.productRepository.getAll(
        props,
      )) as ResponseWithPagination<Product>;

      return {
        ...response,
        data: response.data.map((product) => product.toPrimitives()),
      };
    }

    const products: Product[] = (await this.productRepository.getAll(null)) as Product[];
    return products.map((product) => product.toPrimitives());
  }
}
