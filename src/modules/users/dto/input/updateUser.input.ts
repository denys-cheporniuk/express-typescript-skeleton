import { IsOptional, MinLength } from 'class-validator';

import { UpdateUserInput } from '@/graphql-types';

export class UpdateUserInputData extends UpdateUserInput {
  @IsOptional()
  @MinLength(3)
  firstName: string;

  @IsOptional()
  @MinLength(3)
  lastName: string;
}
