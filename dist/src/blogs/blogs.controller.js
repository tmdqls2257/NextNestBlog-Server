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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blogs_service_1 = require("./blogs.service");
const blog_dto_1 = require("./dto/blog.dto");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("./aws.service");
let BlogsController = class BlogsController {
    constructor(blogsService, awsService) {
        this.blogsService = blogsService;
        this.awsService = awsService;
    }
    async getAllBlog() {
        return await this.blogsService.getAllBlogs();
    }
    async getBlog(id) {
        return await this.blogsService.getBlog(id);
    }
    async blogPost(body) {
        return await this.blogsService.blogPost(body);
    }
    async updateBlog(id, body) {
        return await this.blogsService.updateBlog(id, body);
    }
    async deleteBlog(id) {
        return await this.blogsService.deleteBlog(id);
    }
    async updateImg(file) {
        const res = await this.awsService.uploadFileToS3('blog', file);
        return await this.awsService.getAwsS3FileUrl(res.key);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '모든 블로그 가져오기' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getAllBlog", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 블로그 불러오기' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlog", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '블로그 글쓰기' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogDTO]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "blogPost", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 블로그 수정' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blog_dto_1.BlogDTO]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlog", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 블로그 제거' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlog", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '이미지 업로드' }),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateImg", null);
BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        aws_service_1.AwsService])
], BlogsController);
exports.BlogsController = BlogsController;
//# sourceMappingURL=blogs.controller.js.map