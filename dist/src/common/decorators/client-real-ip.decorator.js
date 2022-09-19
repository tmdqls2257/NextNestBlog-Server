"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientIp = void 0;
const requestIp = require("request-ip");
const common_1 = require("@nestjs/common");
exports.ClientIp = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.headers['cf-connecting-ip'])
        return request.headers['cf-connecting-ip'];
    else
        return requestIp.getClientIp(request);
});
//# sourceMappingURL=client-real-ip.decorator.js.map