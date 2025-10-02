import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  if (process.env.NODE_ENV !== 'test') {
    console.error('[ERR]', status, message, err?.stack);
  }
  res.status(status).json({ ok: false, error: message });
}

export function asyncHandler<T extends (...args: any[]) => Promise<any>>(fn: T) {
  return (req: any, res: any, next: any) => fn(req, res, next).catch(next);
}
