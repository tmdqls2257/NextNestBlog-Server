import {
  ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// JwtAuthGuard를 실행하면 strategy를 자동으로 실행합니다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // throw err || new UnauthorizedException('인증 문제가 있습니다.')
    }
    return user;
  }
}

//* guard -> strategy
