import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    console.error(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    }

    return res.status(500).json({
      type: 'error',
      message: 'Internal server error',
    });
  }
}
