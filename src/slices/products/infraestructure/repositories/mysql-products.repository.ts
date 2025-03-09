import { injectable } from 'tsyringe';
import { Product, ProductPrimitives } from '../../domain/product';
import { IProductsRepository } from '../../domain/products.repositoriy';
import { PrismaClient } from '@prisma/client';
import { ResourceNotFound } from '../../../../shared/errors';

type productDb = ProductPrimitives;

@injectable()
export class ProductRepositoryMysql implements IProductsRepository {
  private prisma = new PrismaClient();
  private async getRecordByQuery(id: string): Promise<productDb | null> {
    return await this.prisma.product.findUnique({ where: { id } });
  }
  async getAll(): Promise<Product[]> {
    const products: ProductPrimitives[] = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products.map((product) => Product.fromPrimitives(product));
  }
  async create(product: Product): Promise<Product> {
    const entity = product.toPrimitives();
    const productDb = await this.prisma.product.create({ data: entity });
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
    const updatedProduct = await this.prisma.product.update({
      where: { id: entity.id },
      data: entity,
    });

    return Product.fromPrimitives(updatedProduct);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
