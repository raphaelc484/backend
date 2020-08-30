import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPatload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureSession(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do token

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // caso passe do if, o token vai estar como "Bearer token"

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPatload;

    request.user = {
      id: sub,
    };

    // console.log(decoded);

    return next();
  } catch (err) {
    throw new AppError('invalid JWT token', 401);
  }
}
