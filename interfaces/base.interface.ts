import { NextFunction, Request, Response } from "express";

export interface ResponseError extends Error {
  status?: number;
}
export { NextFunction, Request, Response };
