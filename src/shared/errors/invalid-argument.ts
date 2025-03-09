import { JSONType } from '../custom-types';
import { CustomError, ErrorKind } from './custom-error';

export class InvalidArgument extends CustomError<typeof InvalidArgument.CODE> {
  static CODE = 'INVALID_ARGUMENT';

  private constructor(msg: string, metadata?: JSONType) {
    super(InvalidArgument.CODE, msg, metadata);
  }

  static create(msg: string, metadata?: JSONType): InvalidArgument {
    return new InvalidArgument(msg, metadata);
  }

  override getKind(): ErrorKind {
    return 'BadRequest';
  }
}
