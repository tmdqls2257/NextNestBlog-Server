import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentBlog = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (request.user) return request.user;
    else null;
  },
);
