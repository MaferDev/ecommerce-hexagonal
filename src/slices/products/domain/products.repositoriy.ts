import { Product } from './product';

export interface IProductsRepository {
  getAll(): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  getById(id: string): Promise<Product | null>;
  getBySlug(slug: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
