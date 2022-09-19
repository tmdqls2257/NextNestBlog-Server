import { Response } from 'express';
import { UsersService } from './users.service';
import { UserLogInDTO } from './dtos/user-login.dto';
import { UserRegisterDTO } from './dtos/user-register.dto';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly usersRepository;
    private readonly logger;
    constructor(usersService: UsersService, usersRepository: Repository<UserEntity>);
    getCurrentUser(currentUser: UserDTO): Promise<UserDTO>;
    signUp(userRegisterDTO: UserRegisterDTO): Promise<void>;
    logIn(userLoginDTO: UserLogInDTO, response: Response): Promise<UserDTO>;
    logOut(response: Response): Promise<void>;
}
