import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { HttpApiExceptionFilter } from './common/exceptions/http-api-exception.filter';
import * as expressSession from 'express-session';
import * as path from 'path';

class Application {
  private logger = new Logger(Application.name);
  private DEV_MODE: boolean;
  private PORT: string;
  // private corsOriginPort: string[];
  private ADMIN_USER: string;
  private ADMIN_PASSWORD: string;

  constructor(private server: NestExpressApplication) {
    this.server = server;

    if (!process.env.SECRET_KEY) this.logger.error('Set "SECRET" env');
    this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
    this.PORT = process.env.PORT || '8080';
    // this.corsOriginPort = process.env.CORS_ORIGIN_PORT
    //   ? process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim())
    //   : ['*'];
    // ("https://google.com, https://naver.com");
    this.ADMIN_USER = process.env.ADMIN_USER || 'amamov';
    this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1205';
  }

  // localhost:8080/media/blogs/aaa.png

  private multer() {
    this.server.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
      prefix: '/media',
    });
  }

  private setUpBasicAuth() {
    // admin계정으로만 api 문서를 접근할 수 있게 하기위해
    this.server.use(
      ['/docs', '/docs-json'],
      expressBasicAuth({
        challenge: true,
        users: {
          [this.ADMIN_USER]: this.ADMIN_PASSWORD,
        },
      }),
    );
  }

  // swagger api 문서
  private setUpOpenAPIMidleware() {
    SwaggerModule.setup(
      'docs',
      this.server,
      SwaggerModule.createDocument(
        this.server,
        new DocumentBuilder()
          .setTitle('Yoon Sang Seok - API')
          .setDescription('TypeORM In Nest')
          .setVersion('0.0.1')
          .build(),
      ),
    );
  }

  private async setUpGlobalMiddleware() {
    this.server.enableCors({
      origin: process.env.CORS_PORT,
      credentials: true,
    });
    this.server.use(
      expressSession({
        secret: 'SECRET',
        resave: true,
        saveUninitialized: true,
      }),
    );
    //  쿠키를 읽어서 req.cookies로 만들기 위해
    // https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-bodyParser-cookieParser-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4
    this.server.use(cookieParser());
    this.setUpBasicAuth();
    this.setUpOpenAPIMidleware();
    this.multer();

    // pipeline을 글로벌하게 사용할 수 있게
    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    this.server.use(passport.initialize());
    this.server.use(passport.session());
    // 응답 객체 직렬화
    // https://jojoldu.tistory.com/610
    this.server.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.server.get(Reflector)),
    );
    this.server.useGlobalFilters(new HttpApiExceptionFilter());
  }

  async boostrap() {
    await this.setUpGlobalMiddleware();
    await this.server.listen(this.PORT);
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
    } else {
      this.logger.log(`✅ Server on port ${this.PORT}...`);
    }
  }

  errorLog(error: string) {
    this.logger.error(`🆘 Server error ${error}`);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  await app.boostrap();
  app.startLog();
}

init().catch((error) => {
  new Logger('init').error(error);
});
