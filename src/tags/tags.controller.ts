import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TagsService } from "./tags.service";

@Controller("tags")
export class TagsController {
  constructor(private TagsService: TagsService) {}

  @Get()
  async getTags() {
    return await this.TagsService.getTags();
  }

  @Get(":id")
  async getTag(@Body() names: string[]) {
    return this.TagsService.postTags(names);
  }

  @Post()
  async postTags(@Body("name") name: string[]) {
    return this.TagsService.postTags(name);
  }

  @Delete(":id")
  async deleteAllTags(@Param("id") id: string) {
    return this.TagsService.deleteAllTags(id);
  }
}
