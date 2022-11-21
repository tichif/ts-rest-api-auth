import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';

import User, { UserDocument } from '../models/user.model';
import { databaseResponseTimeHistogram } from '../utils/metrics';

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) {
  const timer = databaseResponseTimeHistogram.startTimer();
  const metricsLabels = {
    operation: 'createUser',
  };
  try {
    const result = await User.create(input);
    timer({ ...metricsLabels, success: 1 });
    return result;
  } catch (error: any) {
    timer({ ...metricsLabels, success: 0 });
    throw new Error(error);
  }
}

export async function validatePassword(email: string, password: string) {
  const user = await User.findOne({ email }).select('password');

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return await User.findOne(query);
}
