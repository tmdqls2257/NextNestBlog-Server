/// <reference types="multer" />
import { BlogsService } from './blogs.service';
import { BlogDTO } from './dto/blog.dto';
import { AwsService } from './aws.service';
export declare class BlogsController {
    private blogsService;
    private awsService;
    constructor(blogsService: BlogsService, awsService: AwsService);
    getAllBlog(): Promise<import("./blogs.entity").BlogEntity[]>;
    getBlog(id: string): Promise<import("./blogs.entity").BlogEntity>;
    blogPost(body: BlogDTO): Promise<{
        title: string;
        contents: string;
        description: string;
    } & import("./blogs.entity").BlogEntity>;
    updateBlog(id: string, body: BlogDTO): Promise<import("typeorm").UpdateResult>;
    deleteBlog(id: string): Promise<import("typeorm").DeleteResult>;
    updateImg(file: Express.Multer.File): Promise<string>;
}
