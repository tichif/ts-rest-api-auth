import { Request, Response } from 'express';
import config from 'config';

import { createSession, findSessions } from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import { CreateSessionType } from '../schemas/session.schema';

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionType>,
  res: Response
) {
  const { email, password } = req.body;
  // validate user'password
  const user = await validatePassword(email, password);

  if (!user) {
    return res.status(422).send('Email or password incorrect');
  }

  // create session
  const session = await createSession(user._id, req.get('user-agent') || '');

  // create access token
  const accessToken = signJwt(
    {
      ...user,
      //@ts-ignore
      session: session._id,
    },
    {
      expiresIn: config.get<string>('accessTokenTtl'), //15 minutes
    }
  );

  // create refresh token
  const refreshToken = signJwt(
    {
      ...user,
      //@ts-ignore
      session: session._id,
    },
    {
      expiresIn: config.get<string>('refreshTokenTtl'), //1 year
    }
  );

  //return tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}
