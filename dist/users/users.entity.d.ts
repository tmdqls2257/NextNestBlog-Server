import { CommonEntity } from '../common/entities/common.entity';
import { ProfileEntity } from '../profiles/profiles.entity';
import { BlogEntity } from '../blogs/blogs.entity';
export declare class UserEntity extends CommonEntity {
    email: string;
    username: string;
    password: string;
    isAdmin: boolean;
    profile: ProfileEntity;
    blogs: BlogEntity[];
}
