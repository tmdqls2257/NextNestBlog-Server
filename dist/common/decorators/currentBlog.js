"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentBlog = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentBlog = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user)
        return request.user;
    else
        null;
});
//# sourceMappingURL=currentBlog.js.map