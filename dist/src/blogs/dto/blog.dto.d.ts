import { BlogEntity } from 'src/blogs/blogs.entity';
declare const BlogDTO_base: import("@nestjs/common").Type<Pick<BlogEntity, "description" | "title" | "contents">>;
export declare class BlogDTO extends BlogDTO_base {
}
export {};
