import { RateLimiterRedis } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError.js";

const limiter = new RateLimiterRedis({
  storeClient: global,
  keyPrefix: "rateLimiter",
  points: 5,
  duration: 5,
});


export default async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(req.ip as string);

    return next();
  } catch (err) {
    throw new AppError("Too Many Requests", 429);
  }
}
