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
exports.CommonEntity = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CommonEntity {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'de992305-c065-4644-804f-2879952e0a54',
        description: 'id',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CommonEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-09-03T03:08:48.730Z',
        description: 'createdAt',
    }),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
    }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2022-09-03T03:08:48.730Z',
        description: 'updatedAt',
    }),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'null',
        description: 'deletedAt',
    }),
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], CommonEntity.prototype, "deletedAt", void 0);
exports.CommonEntity = CommonEntity;
//# sourceMappingURL=common.entity.js.map