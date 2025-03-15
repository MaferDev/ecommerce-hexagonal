import { injectable } from 'tsyringe';
import { Product, ProductPrimitives } from '../../domain/product';
import { IProductsRepository } from '../../domain/products.repositoriy';
import { PrismaClient, ProductStatus } from '@prisma/client';
import { ResourceNotFound } from '../../../../shared/errors';
import { SearchDTO } from '../../../../shared/dtos/search-pagination.dto';
import { ResponseWithPagination } from '../../../../shared/dtos/response-with-pagination';

type productDb = ProductPrimitives;

@injectable()
export class ProductRepositoryMysql implements IProductsRepository {
  private prisma = new PrismaClient();
  private async getRecordByQuery(id: string): Promise<productDb | null> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async getAll(query: SearchDTO): Promise<Product[] | ResponseWithPagination<Product>> {
    if (query) {
      const skip = (query.page - 1) * query.perPage;
      const [products, total] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          skip,
          take: query.perPage,
          orderBy: {
            createdAt: 'desc', // Ordenar por fecha de creación, puedes cambiarlo
          },
        }),
        this.prisma.product.count(),
      ]);

      return {
        data: products.map((product) => Product.fromPrimitives(product)),
        total,
        page: query.page,
        per_page: query.perPage,
      };
    }

    // Withouth pagination
    const products: ProductPrimitives[] = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products.map((product) => Product.fromPrimitives(product));
  }
  async create(product: Product): Promise<Product> {
    const entity = product.toPrimitives();

    const status: ProductStatus =
      ProductStatus[entity.status as keyof typeof ProductStatus] || ProductStatus.INACTIVE;

    const productDb = await this.prisma.product.create({ data: { ...entity, status } });

    return Product.fromPrimitives(productDb);
  }
  async getById(id: string): Promise<Product | null> {
    const product = await this.getRecordByQuery(id);

    if (!product) return null;

    return Product.fromPrimitives(product);
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { slug } });

    if (!product) return null;

    return Product.fromPrimitives(product);
  }
  async update(product: Product): Promise<Product> {
    const entity = product.toPrimitives();

    const status: ProductStatus =
      ProductStatus[entity.status as keyof typeof ProductStatus] || ProductStatus.INACTIVE;

    const updatedProduct = await this.prisma.product.update({
      where: { id: entity.id },
      data: { ...entity, status },
    });

    return Product.fromPrimitives(updatedProduct);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  async getByIds(ids: string[]): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { id: { in: ids } },
    });

    return products.map((product) => Product.fromPrimitives(product));
  }
}
