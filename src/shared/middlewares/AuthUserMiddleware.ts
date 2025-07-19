import { NextFunction, Request, Response } from "express";
import { verify, Secret } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import 'dotenv/config';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class AuthMiddleware {
  static execute(request: Request, response: Response, next:NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token is missing", 401);
    }

    const [, token] = authHeader.split(" ");
    try {
      const decodedToken = verify(token, process.env.JWT_SECRET as Secret);
      const { sub } = decodedToken as ITokenPayload;
      request.user = {
        id: sub,
      };

      return next();
    } catch (error) {
      throw new AppError("Invalid JWT token", 401);
    }
  }
}
