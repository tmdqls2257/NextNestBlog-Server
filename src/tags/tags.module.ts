import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "src/blogs/blogs.entity";

import { TagsController } from "./tags.controller";
import { TagEntity } from "./tags.entity";
import { TagsService } from "./tags.service";

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity, TagEntity])],
  controllers: [TagsController],
  exports: [TagsService],
  providers: [TagsService],
})
export class TagsModule {}
