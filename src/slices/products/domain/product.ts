import { ToPrimitives } from '../../../shared/custom-types';
import { NonEmptyString } from '../../../shared/value-objects';
import { Price } from './value-objects/price';
import { ProductId } from './value-objects/product-id';
import { ProductName } from './value-objects/product-name';
import { ProductSlug } from './value-objects/product-slug';
import { ProductStatus, ProductStatusEnum } from './value-objects/product-status';
import { ProductStock } from './value-objects/product-stock';

export type ProductPrimitives = ToPrimitives<Product>;

export class Product {
  private constructor(
    public id: ProductId,
    public name: ProductName,
    public price: Price,
    public description: NonEmptyString,
    public stock: ProductStock,
    public slug: ProductSlug,
    public status: ProductStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    params: Omit<ProductPrimitives, 'id' | 'createdAt' | 'updatedAt' | 'slug' | 'status'>,
  ): Product {
    return new Product(
      ProductId.generateUnique(),
      new ProductName(params.name),
      new Price(params.price),
      new NonEmptyString(params.description),
      new ProductStock(params.stock),
      new ProductSlug(params.name),
      new ProductStatus(ProductStatusEnum.ACTIVE),
      new Date(),
      new Date(),
    );
  }

  static fromPrimitives(primitives: ProductPrimitives): Product {
    return new Product(
      new ProductId(primitives.id),
      new ProductName(primitives.name),
      new Price(primitives.price),
      new NonEmptyString(primitives.description),
      new ProductStock(primitives.stock),
      new ProductSlug(primitives.slug),
      new ProductStatus(primitives.status),
      primitives.createdAt,
      primitives.updatedAt,
    );
  }

  update(props: Partial<Omit<ProductPrimitives, 'id' | 'createdAt' | 'updatedAt'>>): void {
    if (props.name) {
      this.name = new ProductName(props.name);
      this.slug = new ProductSlug(props.name);
    }

    if (props.price) this.price = new Price(props.price);

    if (props.description) this.description = new NonEmptyString(props.description);

    if (props.stock) this.stock = new ProductStock(props.stock);

    if (props.status) this.status = new ProductStatus(props.status);

    this.updatedAt = new Date();
  }

  toPrimitives(): ProductPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      price: this.price.value,
      description: this.description.value,
      stock: this.stock.value,
      slug: this.slug.value,
      status: this.status.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
