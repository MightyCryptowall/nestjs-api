import { DatabaseModule } from './../database/database.module';
import { UsersModule } from './../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';

import { Repository } from 'typeorm';
import { AuthenticationService } from './authentication.service';
import * as Joi from '@hapi/joi';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            POSTGRES_HOST: Joi.string().required(),
            POSTGRES_PORT: Joi.number().required(),
            POSTGRES_USER: Joi.string().required(),
            POSTGRES_PASSWORD: Joi.string().required(),
            POSTGRES_DB: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRATION_TIME: Joi.string().required(),
            PORT: Joi.number(),
          })
        }),
        DatabaseModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
            },
          }),
        }),
      ],
      providers: [AuthenticationService],
    }).compile();

    authenticationService = await module.get<AuthenticationService>(AuthenticationService);
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = '23ca0e0b-cce0-43e6-8371-059f1f94ea76';
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId),
      ).toEqual('string');
    });
  });
});
