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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_entity_1 = require("./blogs.entity");
const typeorm_2 = require("typeorm");
let BlogsService = class BlogsService {
    constructor(BlogEntityRepository) {
        this.BlogEntityRepository = BlogEntityRepository;
    }
    async getAllBlogs() {
        try {
            const blogs = await this.BlogEntityRepository.find();
            return blogs;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getBlog(id) {
        try {
            const blog = await this.BlogEntityRepository.findOne({
                where: { id },
            });
            return blog;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async blogPost(BlogEntity) {
        const { title, contents, description } = BlogEntity;
        const newBlog = await this.BlogEntityRepository.save({
            title,
            contents,
            description,
        });
        return newBlog;
    }
    async updateBlog(id, body) {
        const { title, contents, description } = body;
        const date = new Date(Date.now());
        const updateblog = this.BlogEntityRepository.update(id, {
            title,
            contents,
            description,
            updatedAt: date,
        });
        return updateblog;
    }
    async deleteBlog(id) {
        const deleteBlog = await this.BlogEntityRepository.delete(id);
        return deleteBlog;
    }
};
BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blogs_entity_1.BlogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlogsService);
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map