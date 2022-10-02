import { PickType } from "@nestjs/swagger";
import { TagEntity } from "../tags.entity";

export class TagDto extends PickType(TagEntity, ["blog", "name"] as const) {}
