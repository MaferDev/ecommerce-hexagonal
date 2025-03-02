import { ILogger } from '@team_seki/winston-logger';
import { JSONType } from '../../custom-types';

export type ErrorKind =
  | 'BadRequest'
  | 'Unauthorized'
  | 'NotFound'
  | 'Forbidden'
  | 'NotAcceptable'
  | 'RequestTimeout'
  | 'Conflict'
  | 'UnprocessableEntity'
  | 'InternalServerError'
  | 'ServiceUnavailable'
  | 'PreconditionFailed';

export abstract class CustomError<C extends string> extends Error {
  public issuedAt: Date;

  constructor(public code: C, message: string, public metadata: JSONType = {}) {
    super(message);
    this.name = this.constructor.name;
    this.issuedAt = new Date();
  }

  toJSON(): JSONType {
    return {
      code: this.code,
      message: this.message,
      issuedAt: this.issuedAt.toISOString(),
      metadata: this.metadata,
    };
  }

  logWith(logger: ILogger): void {
    logger.error(this.message, {
      code: this.code,
      issuedAt: this.issuedAt,
      ...(typeof this.metadata == 'object' ? this.metadata : { metadata: this.metadata }),
    });
    logger.debug(`Stack trace`, { stack: this.stack });
  }

  abstract getKind(): ErrorKind;
}
