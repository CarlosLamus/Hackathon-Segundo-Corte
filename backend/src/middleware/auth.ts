import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string; username: string; role: string };
}

export function authRequired(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ ok: false, error: 'Token requerido' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = { id: payload.id, username: payload.username, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ ok: false, error: 'Token inválido' });
  }
}
