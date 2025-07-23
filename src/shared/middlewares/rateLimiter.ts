import { RateLimiterRedis } from "rate-limiter-flexible";

const limiter = new RateLimiterRedis({
  storeClient: global,
  keyPrefix: "rateLimiter",
  points: 5,
  duration: 1,
});
