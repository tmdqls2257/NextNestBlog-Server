import { CommonEntity } from '../common/entities/common.entity';
import { UserEntity } from '../users/users.entity';
export declare class ProfileEntity extends CommonEntity {
    bio: string;
    site: string;
    img_url: string;
    user: UserEntity;
}
