import { Module } from '@nestjs/common';

import { PrismaService } from '@/modules/prisma/prisma.service';
import { UsersRepository } from '@/modules/users/users.repository';
import { UserResolvers } from '@/modules/users/users.resolver';
import { UsersService } from '@/modules/users/users.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserResolvers, UsersService, UsersRepository, PrismaService]
})
export class UserModule {}
