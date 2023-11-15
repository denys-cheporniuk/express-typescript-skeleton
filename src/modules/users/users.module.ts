import { Module } from '@nestjs/common';

import { UserResolvers } from '@/modules/users/resolvers';

@Module({
  imports: [],
  controllers: [],
  providers: [UserResolvers]
})
export class UserModule {}
