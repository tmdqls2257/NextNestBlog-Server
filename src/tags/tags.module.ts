import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from 'src/blogs/blogs.entity';
import { VisitorEntity } from '../visitors/visitors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity, VisitorEntity])],
})
export class TagsModule {}
