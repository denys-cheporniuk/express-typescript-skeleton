/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
  email: string;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
}

export class UpdateUserInput {
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
}

export class User {
  id: number;
  createdAt: Date;
  email: string;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
}

export abstract class IQuery {
  userById?: User;
}

export abstract class IMutation {
  createUser?: User;
  updateUser?: User;
}

type Nullable<T> = T | null;
