import { Express, Request, Response } from 'express';

import { createUserHandler } from './controllers/user.controller';
import validate from './middleware/validateResult';
import { createUserSchema } from './schemas/user.schema';
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from './controllers/session.controller';
import { createSessionSchema } from './schemas/session.schema';
import requireUser from './middleware/requireUser';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema,
} from './schemas/product.schema';
import {
  createProductHandler,
  updateProductHandler,
  getProductHandler,
  deleteProductHandler,
} from './controllers/product.controller';

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

  app.get('/api/sessions', requireUser, getUserSessionHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);

  app.post(
    '/api/products',
    requireUser,
    validate(createProductSchema),
    createProductHandler
  );

  app
    .route('/api/products/:productId')
    .get(validate(getProductSchema), getProductHandler)
    .put(requireUser, validate(updateProductSchema), updateProductHandler)
    .delete(requireUser, validate(deleteProductSchema), deleteProductHandler);
}

export default routes;
