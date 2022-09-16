import { UserEntity } from '../users.entity';
declare const UserRegisterDTO_base: import("@nestjs/common").Type<Pick<UserEntity, "email" | "username">>;
export declare class UserRegisterDTO extends UserRegisterDTO_base {
    password: string;
}
export {};
