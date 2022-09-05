import { Request, Response } from 'express';
import { omit } from 'lodash';

import log from '../utils/logger';
import { createUser } from '../services/user.service';
import { CreateUserType } from '../schemas/user.schema';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserType>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.status(201).send(omit(user.toJSON(), 'password'));
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}
