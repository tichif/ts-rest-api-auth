import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Email is invalid'),
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password should have at least 6 characters'),
    passwordConfirm: string({
      required_error: 'Password is required',
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match.',
    path: ['passwordConfirm'],
  }),
});

export type CreateUserType = Omit<
  TypeOf<typeof createUserSchema>['body'],
  'body.passwordConfirmation'
>;
