import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Password is required',
    }).email('Email is incorrect'),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export type CreateSessionType = TypeOf<typeof createSessionSchema>['body'];
