import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import UsersModule from '../users/users.module';

import jwtConstants from './constants';
import AuthController from './controllers/auth.controller';
import AuthService from './providers/auth.service';
import JwtStrategy from './providers/jwt/strategy';
import KakaoStrategy from './providers/kakao/strategy';
import LocalStrategy from './providers/local/strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, KakaoStrategy],
  controllers: [AuthController],
})
export default class AuthModule { }
