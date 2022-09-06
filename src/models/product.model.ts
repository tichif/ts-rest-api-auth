import mongoose, { Document } from 'mongoose';
import { customAlphabet } from 'nanoid';

import { UserDocument } from './user.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwyz0123456789', 10);

export interface ProductDocument extends Document {
  user: UserDocument['_id'];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updateAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<ProductDocument>('Product', ProductSchema);

export default Product;
