import { Logger } from '../logger';
import { JSONType } from '../custom-types';

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

export const ErrorHttpCode = {
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  Forbidden: 403,
  NotAcceptable: 406,
  RequestTimeout: 408,
  Conflict: 409,
  UnprocessableEntity: 422,
  InternalServerError: 500,
  ServiceUnavailable: 503,
  PreconditionFailed: 412,
};

export abstract class CustomError<C extends string> extends Error {
  public issuedAt: Date;
  public statusCode: number;
  constructor(
    public code: C,
    message: string,
    public metadata: JSONType = {},
  ) {
    super(message);
    this.statusCode = ErrorHttpCode[code as keyof typeof ErrorHttpCode];
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

  logWith(logger: Logger): void {
    logger.error(this.message, {
      code: this.code,
      issuedAt: this.issuedAt,
      ...(typeof this.metadata == 'object' ? this.metadata : { metadata: this.metadata }),
    });
    logger.debug(`Stack trace`, { stack: this.stack });
  }

  abstract getKind(): ErrorKind;
}
