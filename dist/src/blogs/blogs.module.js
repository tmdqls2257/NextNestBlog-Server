"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tags_entity_1 = require("../tags/tags.entity");
const visitors_entity_1 = require("../visitors/visitors.entity");
const blogs_controller_1 = require("./blogs.controller");
const blogs_service_1 = require("./blogs.service");
const blogs_entity_1 = require("./blogs.entity");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("./aws.service");
const config_1 = require("@nestjs/config");
const multer = require("multer");
let BlogsModule = class BlogsModule {
};
BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './upload',
                storage: multer.memoryStorage(),
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([blogs_entity_1.BlogEntity, tags_entity_1.TagEntity, visitors_entity_1.VisitorEntity]),
        ],
        controllers: [blogs_controller_1.BlogsController],
        providers: [blogs_service_1.BlogsService, aws_service_1.AwsService],
        exports: [blogs_service_1.BlogsService],
    })
], BlogsModule);
exports.BlogsModule = BlogsModule;
//# sourceMappingURL=blogs.module.js.map