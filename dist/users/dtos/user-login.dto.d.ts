import { UserEntity } from '../users.entity';
declare const UserLogInDTO_base: import("@nestjs/common").Type<Pick<UserEntity, "email">>;
export declare class UserLogInDTO extends UserLogInDTO_base {
    password: string;
}
export {};
