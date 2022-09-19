"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const blogs_entity_1 = require("../blogs.entity");
class BlogDTO extends (0, swagger_1.PickType)(blogs_entity_1.BlogEntity, [
    'title',
    'contents',
    'description',
]) {
}
exports.BlogDTO = BlogDTO;
//# sourceMappingURL=blog.dto.js.map