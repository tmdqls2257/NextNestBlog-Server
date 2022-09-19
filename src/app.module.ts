import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { TagsModule } from './tags/tags.module';
import { VisitorsModule } from './visitors/visitors.module';
import { ProfilesModule } from './profiles/profiles.module';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      // namingStrategy: new SnakeNamingStrategy(),
      // type: 'postgres',
      // host: configService.get('DB_HOST'), // process.env.DB_HOST
      // port: configService.get('DB_PORT'),
      // username: configService.get('DB_USERNAME'),
      // password: configService.get('DB_PASSWORD'),
      // database: configService.get('DB_NAME'),
      // entities: ['dist/**/*.entity{.ts,.js}'],
      // synchronize: false,
      // migrations: ['dist/src/migrations/*{.ts,.js}'],
      // migrationsTableName: 'history',
      // // migrationsRun: true,
      // autoLoadEntities: true,
      // logging: true,
      // keepConnectionAlive: true,
      // migrationsRun: true,
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
  inject: [ConfigService],
};

@Module({
  imports: [
    // env를 사용하기 위한 설정
    // Joi는 환경변수의 유효성 검사를 해주는 패키지 환경변수가 없을 경우 자동으로 throw를 던져줍니다.
    ConfigModule.forRoot({
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
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    BlogsModule,
    TagsModule,
    VisitorsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
