import { PickType } from "@nestjs/swagger";
import { BlogEntity } from "src/blogs/blogs.entity";

export class BlogDTO extends PickType(BlogEntity, [
  "title",
  "contents",
  "description",
  "imageUrl",
  "tags",
] as const) {}
