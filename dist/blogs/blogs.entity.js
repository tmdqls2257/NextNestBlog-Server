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
exports.BlogEntity = void 0;
const common_entity_1 = require("../common/entities/common.entity");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const tags_entity_1 = require("../tags/tags.entity");
const visitors_entity_1 = require("../visitors/visitors.entity");
const swagger_1 = require("@nestjs/swagger");
let BlogEntity = class BlogEntity extends common_entity_1.CommonEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@test.com',
        description: 'email',
        required: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], BlogEntity.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'html',
        description: 'description',
        required: false,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, default: '' }),
    __metadata("design:type", String)
], BlogEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test content입니다.',
        description: 'contents',
        required: true,
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true, default: '' }),
    __metadata("design:type", String)
], BlogEntity.prototype, "contents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UserEntity, (author) => author.blogs, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([
        {
            name: 'author_id',
            referencedColumnName: 'id',
        },
    ]),
    __metadata("design:type", users_entity_1.UserEntity)
], BlogEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], BlogEntity.prototype, "likeCount", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tags_entity_1.TagEntity, (tag) => tag.blog, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'BLOG_TAG',
        joinColumn: {
            name: 'blog_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", tags_entity_1.TagEntity)
], BlogEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visitors_entity_1.VisitorEntity, (visitor) => visitor.blog, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], BlogEntity.prototype, "visitors", void 0);
BlogEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'BLOG',
    })
], BlogEntity);
exports.BlogEntity = BlogEntity;
//# sourceMappingURL=blogs.entity.js.map