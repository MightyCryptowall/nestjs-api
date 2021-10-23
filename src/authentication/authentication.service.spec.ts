import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';

import { Repository } from 'typeorm';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  
  const authenticationService = new AuthenticationService(
    new UsersService(
      new Repository<User>()
    ),
    new JwtService({
      secretOrPrivateKey: "Secret Key"
    }),
    new ConfigService()
  );

  describe("when creating a cookie", () => {
    it("should return a string", () => {
      const userId = "23ca0e0b-cce0-43e6-8371-059f1f94ea76";
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId)
      ).toEqual("string");
    })
  })

});

