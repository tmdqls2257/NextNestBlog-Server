import { UserEntity } from '../users.entity';
declare const UserDTO_base: import("@nestjs/common").Type<Omit<UserEntity, "password">>;
export declare class UserDTO extends UserDTO_base {
}
export {};
