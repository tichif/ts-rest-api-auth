import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../services/session.service';

import { verifyJwt } from '../utils/jwt.utils';

async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  const refreshToken = get(req, 'headers.x-refresh', '');

  if (!accessToken) {
    return next();
  }

  const { decoded, expire } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expire && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    if (typeof newAccessToken === 'string') {
      const result = verifyJwt(newAccessToken);
      res.locals.user = result.decoded;
      return next();
    }
  }

  return next();
}

export default deserializeUser;
