import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '../tags/tags.entity';
import { VisitorEntity } from '../visitors/visitors.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogEntity } from 'src/blogs/blogs.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AwsService } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import multer = require('multer');
@Module({
  //https://junior-datalist.tistory.com/147
  imports: [
    MulterModule.register({
      dest: './upload',
      storage: multer.memoryStorage(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([BlogEntity, TagEntity, VisitorEntity]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, AwsService],
  exports: [BlogsService],
})
export class BlogsModule {}
