import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserInput {
  @IsEmail()
  email: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;
}
