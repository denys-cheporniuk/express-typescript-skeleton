import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Users')
export class UserResolvers {
  @Query('getUserById')
  getUserById() {
    return {
      id: 1,
      firstName: '123123'
    };
  }
}
