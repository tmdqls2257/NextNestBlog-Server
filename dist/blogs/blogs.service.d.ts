import { BlogEntity } from 'src/blogs/blogs.entity';
import { Repository } from 'typeorm';
import { BlogDTO } from './dto/blog.dto';
export declare class BlogsService {
    private readonly BlogEntityRepository;
    constructor(BlogEntityRepository: Repository<BlogEntity>);
    getAllBlogs(): Promise<BlogEntity[]>;
    getBlog(id: string): Promise<BlogEntity>;
    blogPost(BlogEntity: BlogDTO): Promise<{
        title: string;
        contents: string;
        description: string;
    } & BlogEntity>;
    updateBlog(id: string, body: BlogDTO): Promise<import("typeorm").UpdateResult>;
    deleteBlog(id: string): Promise<import("typeorm").DeleteResult>;
}
