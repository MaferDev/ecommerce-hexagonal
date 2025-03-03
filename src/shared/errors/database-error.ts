import { JSONType } from '../custom-types';
import { CustomError, ErrorKind } from './custom-error';

export class DatabaseException extends CustomError<typeof DatabaseException.CODE> {
  static CODE = 'DATABASE_EXCEPTION';

  private constructor(msg: string, metadata: JSONType) {
    super(DatabaseException.CODE, msg, metadata);
  }

  static create(
    msg: string,
    operation: 'read' | 'update' | 'delete' | 'insert',
    record: string,
  ): DatabaseException {
    return new DatabaseException(msg, { operation, record });
  }

  override getKind(): ErrorKind {
    return 'InternalServerError';
  }
}
