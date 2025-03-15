import { ResponseWithPagination } from '../../../shared/dtos/response-with-pagination';
import { SearchDTO } from '../../../shared/dtos/search-pagination.dto';
import { Product } from './product';

export interface IProductsRepository {
  getAll(query: SearchDTO | null): Promise<Product[] | ResponseWithPagination<Product>>;
  create(product: Product): Promise<Product>;
  getById(id: string): Promise<Product | null>;
  getBySlug(slug: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  getByIds(ids: string[]): Promise<Product[]>;
}
