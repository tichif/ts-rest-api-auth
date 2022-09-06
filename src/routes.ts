import { Express, Request, Response } from 'express';

import { createUserHandler } from './controllers/user.controller';
import validate from './middleware/validateResult';
import { createUserSchema } from './schemas/user.schema';
import { createSessionHandler } from './controllers/session.controller';
import { createSessionSchema } from './schemas/session.schema';

function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post(
    '/api/sessions',
    validate(createSessionSchema),
    createSessionHandler
  );
}

export default routes;
