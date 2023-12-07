import { Test } from '@nestjs/testing';

import { UsersService } from '@/modules/users/users.service';

describe('UserService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [UsersService]
    }).compile();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
