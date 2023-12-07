import { Test } from '@nestjs/testing';

import { User } from '@/graphql-types';
import { UserResolvers } from '@/modules/users/users.resolver';
import { UsersService } from '@/modules/users/users.service';

describe('UserService', () => {
  let userResolver: UserResolvers;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserResolvers,
        {
          provide: UsersService,
          useFactory: () => ({
            getUserById: jest.fn<User, [number]>().mockImplementation(id => ({
              id,
              createdAt: new Date(),
              email: 'test@gmail.com',
              firstName: 'Denys',
              lastName: 'Denys'
            }))
          })
        }
      ]
    }).compile();

    userResolver = module.get(UserResolvers);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });
});
