import { CommonEntity } from '../common/entities/common.entity';
import { BlogEntity } from '../blogs/blogs.entity';
export declare class VisitorEntity extends CommonEntity {
    blog: BlogEntity;
}
