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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const user_login_dto_1 = require("./dtos/user-login.dto");
const user_register_dto_1 = require("./dtos/user-register.dto");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const typeorm_2 = require("typeorm");
const only_private_interceptor_1 = require("../common/interceptors/only-private.interceptor");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const user_dto_1 = require("./dtos/user.dto");
const jwt_guard_1 = require("./jwt/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
let UsersController = UsersController_1 = class UsersController {
    constructor(usersService, usersRepository) {
        this.usersService = usersService;
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(UsersController_1.name);
    }
    async getCurrentUser(currentUser) {
        return currentUser;
    }
    async signUp(userRegisterDTO) {
        return await this.usersService.registerUser(userRegisterDTO);
    }
    async logIn(userLoginDTO, response) {
        const { jwt, user } = await this.usersService.verifyUserAndSignJwt(userLoginDTO.email, userLoginDTO.password);
        response.cookie('jwt', jwt, {
            maxAge: 3600 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return user;
    }
    async logOut(response) {
        response.clearCookie('jwt');
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '모든 유저 정보 가져오기' }),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(only_private_interceptor_1.OnlyPrivateInterceptor),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getCurrentUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_dto_1.UserRegisterDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLogInDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '로그아웃' }),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logOut", null);
UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('users'),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.UserEntity)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_2.Repository])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map