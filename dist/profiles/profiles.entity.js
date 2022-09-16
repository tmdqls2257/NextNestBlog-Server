"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileEntity = void 0;
const common_entity_1 = require("../common/entities/common.entity");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
let ProfileEntity = class ProfileEntity extends common_entity_1.CommonEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "img_url", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => users_entity_1.UserEntity),
    __metadata("design:type", users_entity_1.UserEntity)
], ProfileEntity.prototype, "user", void 0);
ProfileEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'USER_PROFILE',
    })
], ProfileEntity);
exports.ProfileEntity = ProfileEntity;
//# sourceMappingURL=profiles.entity.js.map