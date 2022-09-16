import { CommonEntity } from '../common/entities/common.entity';
import { BlogEntity } from '../blogs/blogs.entity';
export declare class TagEntity extends CommonEntity {
    name: string;
    blog: BlogEntity[];
}
