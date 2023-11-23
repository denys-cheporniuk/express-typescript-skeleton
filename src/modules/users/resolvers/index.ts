import { ParseIntPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User as UserModel } from '@prisma/client';

@Resolver('Users')
export class UserResolvers {
  @Query('userById')
  async findOne(@Args('id', ParseIntPipe) id: number): Promise<UserModel> {
    console.log('id', id);

    return {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: '',
      firstName: '',
      lastName: ''
    };
  }
}
