import * as requestIp from 'request-ip';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// 현 사용자의 IP를 이용
export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (request.headers['cf-connecting-ip'])
      //* cloudflare origin ip */
      return request.headers['cf-connecting-ip'];
    else return requestIp.getClientIp(request);
  },
);
