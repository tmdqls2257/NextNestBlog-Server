import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class OnlyPrivateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    // user의 데이터가 있을 경우 데이터를 리턴합니다.
    if (user) return next.handle().pipe(map((data) => data));
    else throw new UnauthorizedException('인증에 문제가 있습니다.');
  }
}
