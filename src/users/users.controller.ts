import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserLogInDTO } from './dtos/user-login.dto';
import { UserRegisterDTO } from './dtos/user-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { OnlyPrivateInterceptor } from '../common/interceptors/only-private.interceptor';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserDTO } from './dtos/user.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  @ApiOperation({ summary: '모든 유저 정보 가져오기' })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyPrivateInterceptor)
  async getCurrentUser(@CurrentUser() currentUser: UserDTO) {
    return currentUser;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() userRegisterDTO: UserRegisterDTO) {
    return await this.usersService.registerUser(userRegisterDTO);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async logIn(
    @Body() userLoginDTO: UserLogInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    // user의 정보와 jwt를 분리하여 jwt는 cookie에 넣어줍니다.
    const { jwt, user } = await this.usersService.verifyUserAndSignJwt(
      userLoginDTO.email,
      userLoginDTO.password,
    );
    response.cookie('jwt', jwt, {
      maxAge: 3600 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    // return response.status(200).json({ message: 'User has been logout' });
  }
}
