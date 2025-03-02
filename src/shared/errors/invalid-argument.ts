import { CustomError, ErrorKind } from './custom-error';

export class InvalidArgument extends CustomError<typeof InvalidArgument.CODE> {
  static CODE = 'INVALID_ARGUMENT';

  private constructor(msg: string) {
    super(InvalidArgument.CODE, msg);
  }

  static create(msg: string): InvalidArgument {
    return new InvalidArgument(msg);
  }

  override getKind(): ErrorKind {
    return 'BadRequest';
  }
}
