import createSlug from 'speakingurl';
import { NonEmptyString } from '../../../../shared/value-objects';

export class ProductSlug extends NonEmptyString {
  constructor(value: string) {
    const slug = createSlug(value);
    super(slug);
  }
}
