import { IsEmail, IsOptional, MinLength } from 'class-validator';

import { CreateUserInput } from '@/graphql-types';

export class CreateUserInputData extends CreateUserInput {
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(3)
  firstName: string;

  @IsOptional()
  @MinLength(3)
  lastName: string;
}
