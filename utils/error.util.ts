import { ResponseError } from "../interfaces/base.interface";
import { STATUS } from "./constant.util";

class CustomError extends Error implements ResponseError {
  status?: number | undefined;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, STATUS.BAD_REQUEST);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, STATUS.UNAUTHORIZED);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, STATUS.FORBIDDEN);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class TimeoutError extends CustomError {
  constructor(message: string) {
    super(message, STATUS.TIME_OUT);
  }
}

export class TooManyRequestError extends CustomError {
  constructor(message: string) {
    super(message, STATUS.TOO_MANY_REQUEST);
  }
}

export class ServiceUnavailableError extends CustomError {
  constructor(message: string) {
    super(message, STATUS.SERVICE_UNAVAILABLE);
  }
}
