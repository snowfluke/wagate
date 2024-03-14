import { NextFunction, Request, Response } from "express";

const CacheMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Keep cache for 1 hours
  const period = 60 * 60;

  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    res.set("Cache-control", `no-store`);
  }
  next();
};

export default CacheMiddleware;
