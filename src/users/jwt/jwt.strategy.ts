import { JwtPayload } from './jwt.payload';
import { UsersService } from '../users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtExtractorFromCookies } from '../../common/utils/jwtExtractorFromCookies';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      // cookie에 있는 jwt를 추출합니다.
      jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractorFromCookies]),
      secretOrKey: configService.get('SECRET_KEY'),
      ignoreExpiration: false,
    });
  }

  // 요청에서 추출된 jwt를 통하여 유저를 리턴합니다.
  async validate(payload: JwtPayload) {
    try {
      const user = await this.usersService.findUserById(payload.sub);
      if (user) {
        return user;
      } else {
        throw new Error('해당하는 유저는 없습니다.');
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
