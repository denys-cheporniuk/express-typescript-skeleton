import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserInputError } from 'apollo-server-express';

import { CreateUserInputData } from '@/modules/users/dto/input/createUser.input';
import { UpdateUserInputData } from '@/modules/users/dto/input/updateUser.input';
import { UsersRepository } from '@/modules/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new UserInputError(`User with id: ${id} does not exist`);
    }

    return user;
  }

  async createUser(values: CreateUserInputData): Promise<User> {
    return this.usersRepository.createUser(values);
  }

  async updateUserById(id: number, values: UpdateUserInputData): Promise<User> {
    return this.usersRepository.updateUserById(id, values);
  }
}
