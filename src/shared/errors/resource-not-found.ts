import { JSONType } from '../custom-types';
import { CustomError, ErrorKind } from './custom-error';

export class ResourceNotFound extends CustomError<typeof ResourceNotFound.CODE> {
  static CODE = 'RESOURCE_NOT_FOUND';

  private constructor(msg: string, metadata: JSONType) {
    super(ResourceNotFound.CODE, msg, metadata);
  }

  static create(resource: string, metadata: JSONType): ResourceNotFound {
    return new ResourceNotFound(`Resource '${resource}' not found.`, metadata);
  }

  override getKind(): ErrorKind {
    return 'NotFound';
  }
}
