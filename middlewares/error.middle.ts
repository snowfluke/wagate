import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../interfaces/base.interface";
import { STATUS } from "../utils/constant.util";

const ErrorMiddleware = async (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || STATUS.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || "Internal Server Error";

  res
    .status(statusCode)
    .json({ status: "error", code: statusCode, message: errorMessage });
};

export default ErrorMiddleware;
