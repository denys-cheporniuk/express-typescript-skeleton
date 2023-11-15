import { IsOptional } from 'class-validator';

export class CreateUserInput {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;
}
