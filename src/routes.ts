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
  // comments are use in YAML format
  /**
   * @openapi
   * /health:
   *  get:
   *     tags:
   *     - Health
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/health', (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  /**
   * @openapi
   * '/api/users':
   *  post:
   *    tags:
   *      - User
   *    summary: Register a user
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateUserInput'
   *    responses:
   *     201:
   *       description: Success
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserResponse'
   *     409:
   *       description: Conflict
   *     400:
   *       description: Bad request
   */
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
