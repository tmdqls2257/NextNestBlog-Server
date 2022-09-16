"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let UsersService = UsersService_1 = class UsersService {
    constructor(usersRepository, jwtService, configService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async registerUser(userRegisterDTO) {
        const { email, password } = userRegisterDTO;
        const user = await this.usersRepository.findOne({
            where: {
                email,
            },
        });
        if (user) {
            throw new common_1.UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.usersRepository.save(Object.assign(Object.assign({}, userRegisterDTO), { password: hashedPassword }));
    }
    async verifyUserAndSignJwt(email, password) {
        const user = await this.usersRepository.findOne({
            where: {
                email,
            },
        });
        if (!user)
            throw new common_1.UnauthorizedException('해당하는 이메일은 존재하지 않습니다.');
        if (!(await bcrypt.compare(password, user.password)))
            throw new common_1.UnauthorizedException('로그인에 실패하였습니다.');
        try {
            const jwt = await this.jwtService.signAsync({ sub: user.id }, {
                secret: this.configService.get('SECRET_KEY'),
                expiresIn: 3600,
            });
            return { jwt, user };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findUserById(id) {
        try {
            const user = await this.usersRepository.findOne({
                where: {
                    id,
                },
            });
            if (!user)
                throw new Error();
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('해당하는 사용자를 찾을 수 없습니다.');
        }
    }
};
UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map