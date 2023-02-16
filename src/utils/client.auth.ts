import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './client.util';
import { JwtPayload } from 'jsonwebtoken';

export interface authRequest extends Request {
  token: string | JwtPayload;
}

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(' ')[1];

      const decoded = await verifyToken(token);

      (req as authRequest).token = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Authentication needed' });
    }
  }
}
