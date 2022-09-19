"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const users_entity_1 = require("../users.entity");
class UserDTO extends (0, swagger_1.OmitType)(users_entity_1.UserEntity, ['password']) {
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=user.dto.js.map