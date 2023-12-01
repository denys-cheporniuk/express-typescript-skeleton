import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '@/graphql-types';
import { CreateUserInputData } from '@/modules/users/dto/input/createUser.input';
import { UpdateUserInputData } from '@/modules/users/dto/input/updateUser.input';
import { UsersService } from '@/modules/users/users.service';

@Resolver('Users')
export class UserResolvers {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User, { name: 'userById', nullable: false })
  async getUserById(@Args('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => User, { name: 'createUser', nullable: false })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInputData
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => User, { name: 'updateUser', nullable: false })
  async updateUser(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInputData
  ): Promise<User> {
    return this.userService.updateUserById(id, updateUserInput);
  }
}
