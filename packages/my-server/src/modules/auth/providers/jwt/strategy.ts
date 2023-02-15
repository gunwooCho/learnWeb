import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt';

import jwtConstants from '../../constants';
import AuthService from '../auth.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => (
        request?.cookies?.Authentication
      )]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate: VerifyCallback = (payload, done) => {
    // const user = await this.authService.existUser(payload.username);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    done(null, payload);
  }
}
