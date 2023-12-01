import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { CreateUserInputData } from '@/modules/users/dto/input/createUser.input';
import { UpdateUserInputData } from '@/modules/users/dto/input/updateUser.input';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id
      }
    });
  }

  async createUser(data: CreateUserInputData): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUserById(id: number, data: UpdateUserInputData): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data
    });
  }
}
