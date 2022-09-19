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
exports.UserEntity = void 0;
const class_validator_1 = require("class-validator");
const common_entity_1 = require("../common/entities/common.entity");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const profiles_entity_1 = require("../profiles/profiles.entity");
const blogs_entity_1 = require("../blogs/blogs.entity");
const swagger_1 = require("@nestjs/swagger");
let UserEntity = class UserEntity extends common_entity_1.CommonEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@text.com',
        description: 'email',
        required: true,
    }),
    (0, class_validator_1.IsEmail)({}, { message: '올바른 이메일을 작성해주세요.' }),
    (0, class_validator_1.IsNotEmpty)({ message: '이메일을 작성해주세요.' }),
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'tmdqls2257',
        description: 'username',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '이름을 작성해주세요.' }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'chl135',
        description: 'password',
        required: true,
    }),
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'password',
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profiles_entity_1.ProfileEntity),
    (0, typeorm_1.JoinColumn)({ name: 'profile_id', referencedColumnName: 'id' }),
    __metadata("design:type", profiles_entity_1.ProfileEntity)
], UserEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blogs_entity_1.BlogEntity, (blog) => blog.author, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "blogs", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Index)('email', ['email'], { unique: true }),
    (0, typeorm_1.Entity)({
        name: 'USER',
    })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=users.entity.js.map