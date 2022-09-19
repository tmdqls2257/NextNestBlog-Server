"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expressBasicAuth = require("express-basic-auth");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const http_api_exception_filter_1 = require("./common/exceptions/http-api-exception.filter");
const expressSession = require("express-session");
const path = require("path");
class Application {
    constructor(server) {
        this.server = server;
        this.logger = new common_1.Logger(Application.name);
        this.server = server;
        if (!process.env.SECRET_KEY)
            this.logger.error('Set "SECRET" env');
        this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
        this.PORT = process.env.PORT || '8080';
        this.ADMIN_USER = process.env.ADMIN_USER || 'amamov';
        this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1205';
    }
    multer() {
        this.server.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
            prefix: '/media',
        });
    }
    setUpBasicAuth() {
        this.server.use(['/docs', '/docs-json'], expressBasicAuth({
            challenge: true,
            users: {
                [this.ADMIN_USER]: this.ADMIN_PASSWORD,
            },
        }));
    }
    setUpOpenAPIMidleware() {
        swagger_1.SwaggerModule.setup('docs', this.server, swagger_1.SwaggerModule.createDocument(this.server, new swagger_1.DocumentBuilder()
            .setTitle('Yoon Sang Seok - API')
            .setDescription('TypeORM In Nest')
            .setVersion('0.0.1')
            .build()));
    }
    async setUpGlobalMiddleware() {
        this.server.enableCors({
            origin: process.env.CORS_PORT,
            credentials: true,
        });
        this.server.use(expressSession({
            secret: 'SECRET',
            resave: true,
            saveUninitialized: true,
        }));
        this.server.use(cookieParser());
        this.setUpBasicAuth();
        this.setUpOpenAPIMidleware();
        this.multer();
        this.server.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
        }));
        this.server.use(passport.initialize());
        this.server.use(passport.session());
        this.server.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(this.server.get(core_1.Reflector)));
        this.server.useGlobalFilters(new http_api_exception_filter_1.HttpApiExceptionFilter());
    }
    async boostrap() {
        await this.setUpGlobalMiddleware();
        await this.server.listen(this.PORT);
    }
    startLog() {
        if (this.DEV_MODE) {
            this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
        }
        else {
            this.logger.log(`✅ Server on port ${this.PORT}...`);
        }
    }
    errorLog(error) {
        this.logger.error(`🆘 Server error ${error}`);
    }
}
async function init() {
    const server = await core_1.NestFactory.create(app_module_1.AppModule);
    const app = new Application(server);
    await app.boostrap();
    app.startLog();
}
init().catch((error) => {
    new common_1.Logger('init').error(error);
});
//# sourceMappingURL=main.js.map