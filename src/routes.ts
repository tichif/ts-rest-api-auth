import { Express, Request, Response } from 'express';

import { createUserHandler } from './controllers/user.controller';
import validate from './middleware/validateResult';
import { createUserSchema } from './schemas/user.schema';

function routes(app: Express) {
  app.get('/health', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  app.post('/api/users', validate(createUserSchema), createUserHandler);
}

export default routes;
