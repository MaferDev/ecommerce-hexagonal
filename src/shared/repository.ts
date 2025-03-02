import { GenericId } from './value-objects/generic-id';

export type Repository<T> = {
  add(entity: T): Promise<void>;
  update(updatedEntity: T): Promise<void>;
  delete(id: GenericId): Promise<void>;
  getById(id: GenericId): Promise<T>;
};
