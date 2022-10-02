import { CommonEntity } from "../common/entities/common.entity"; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogEntity } from "../blogs/blogs.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

@Entity({
  name: "TAG",
})
export class TagEntity {
  @ApiProperty({
    example: "de992305-c065-4644-804f-2879952e0a54",
    description: "id",
  })
  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @ManyToMany(() => BlogEntity, (blog: BlogEntity) => blog.tags, {
    // cascade: true,
  })
  blog: BlogEntity[];
}
