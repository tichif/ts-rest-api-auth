import { object, string, number, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - price
 *        - image
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        image:
 *          type: string
 */

const body = {
  body: object({
    title: string({
      required_error: ' Title is required',
    }),
    description: string({
      required_error: ' Description is required',
    }).min(20, 'The description should have at least 20 characters'),
    image: string({
      required_error: ' Image is required',
    }),
    price: number({
      required_error: 'Price is required',
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: 'Product ID is required',
    }),
  }),
};

export const createProductSchema = object({
  ...body,
});

export const updateProductSchema = object({
  ...body,
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export type CreateProductType = TypeOf<typeof createProductSchema>['body'];
export type UpdateProductType = TypeOf<typeof updateProductSchema>;
export type GetProductType = TypeOf<typeof getProductSchema>['params'];
export type DeleteProductType = TypeOf<typeof deleteProductSchema>['params'];
