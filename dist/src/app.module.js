"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.typeOrmModuleOptions = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const Joi = require("joi");
const app_controller_1 = require("./app.controller");
const users_module_1 = require("./users/users.module");
const blogs_module_1 = require("./blogs/blogs.module");
const tags_module_1 = require("./tags/tags.module");
const visitors_module_1 = require("./visitors/visitors.module");
const profiles_module_1 = require("./profiles/profiles.module");
exports.typeOrmModuleOptions = {
    useFactory: async (configService) => {
        return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities: ['dist/**/*.entity{.ts,.js}'],
            logging: true,
            synchronize: false,
            migrationsRun: false,
            migrations: ['dist/**/migrations/**/*{.ts,.js}'],
        };
    },
    inject: [config_1.ConfigService],
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string()
                        .valid('development', 'production', 'test', 'provision')
                        .default('development'),
                    PORT: Joi.number().default(8080),
                    SECRET_KEY: Joi.string().required(),
                    ADMIN_USER: Joi.string().required(),
                    ADMIN_PASSWORD: Joi.string().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync(exports.typeOrmModuleOptions),
            users_module_1.UsersModule,
            blogs_module_1.BlogsModule,
            tags_module_1.TagsModule,
            visitors_module_1.VisitorsModule,
            profiles_module_1.ProfilesModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map