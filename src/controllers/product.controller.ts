import { Request, Response } from 'express';

import {
  CreateProductType,
  UpdateProductType,
  GetProductType,
  DeleteProductType,
} from '../schemas/product.schema';
import {
  createProduct,
  findAndUpdateProduct,
  findProduct,
  findAndDeleteProduct,
} from '../services/product.service';

export async function createProductHandler(
  req: Request<{}, {}, CreateProductType>,
  res: Response
) {
  const product = await createProduct({
    ...req.body,
    user: res.locals.user._id,
  });

  return res.send(product);
}

export async function updateProductHandler(
  req: Request<UpdateProductType['params'], {}, UpdateProductType['body']>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const body = req.body;

  const product = await findProduct({ productId });

  if (!product) {
    return res.send('Product not found');
  }

  if (product.user.toString() !== userId) {
    return res.status(401).send('Not authorized');
  }

  const updateProduct = await findAndUpdateProduct({ productId }, body, {
    new: true,
  });

  return res.send(updateProduct);
}

export async function getProductHandler(
  req: Request<GetProductType>,
  res: Response
) {
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.send('Product not found');
  }

  return res.send(product);
}

export async function deleteProductHandler(
  req: Request<DeleteProductType>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.send('Product not found');
  }

  if (product.user.toString() !== userId) {
    return res.status(401).send('Not authorized');
  }

  await findAndDeleteProduct({ productId });

  return res.send('Product removed');
}
