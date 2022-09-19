import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { UserDTO } from './dtos/user.dto';
import { UserLogInDTO } from './dtos/user-login.dto';
import { UserRegisterDTO } from './dtos/user-register.dto';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    constructor(usersRepository: Repository<UserEntity>, jwtService: JwtService, configService: ConfigService);
    registerUser(userRegisterDTO: UserRegisterDTO): Promise<void>;
    verifyUserAndSignJwt(email: UserLogInDTO['email'], password: UserLogInDTO['password']): Promise<{
        jwt: string;
        user: UserDTO;
    }>;
    findUserById(id: string): Promise<UserEntity>;
}
