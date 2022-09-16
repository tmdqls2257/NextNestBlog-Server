import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../users/users.entity';
import { TagEntity } from '../tags/tags.entity';
import { VisitorEntity } from '../visitors/visitors.entity';
export declare class BlogEntity extends CommonEntity {
    title: string;
    description: string;
    contents: string;
    author: UserEntity;
    likeCount: number;
    tags: TagEntity;
    visitors: VisitorEntity[];
}
