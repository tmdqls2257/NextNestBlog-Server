import { CommonEntity } from '../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { TagEntity } from '../tags/tags.entity';
import { VisitorEntity } from '../visitors/visitors.entity';
import { ApiProperty } from '@nestjs/swagger';

// db에 실제로 들어가는 bd명
@Entity({
  name: 'BLOG',
})
export class BlogEntity extends CommonEntity {
  // Column: db에 저장될 때 어떠한 형식으로 저장되는지 결정하는 데코레이터
  @ApiProperty({
    example: 'test@test.com',
    description: 'email',
    required: true,
  })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ApiProperty({
    example: 'html',
    description: 'description',
    required: false,
  })
  @Column({ type: 'varchar', nullable: false, default: '' })
  description: string;

  @ApiProperty({
    example: 'test content입니다.',
    description: 'contents',
    required: true,
  })
  @Column({ type: 'text', nullable: true, default: '' })
  contents: string;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.blogs, {
    // 사용자가 삭제되면 블로그도 삭제됩니다.
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    // foreignkey 정보들 입력
    {
      name: 'author_id',
      referencedColumnName: 'id',
    },
  ])
  author: UserEntity;

  @Column({ type: 'int', nullable: true, default: 0 })
  likeCount: number;

  @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.blog, {
    cascade: true,
  })
  @JoinTable({
    name: 'BLOG_TAG',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity;

  @OneToMany(() => VisitorEntity, (visitor: VisitorEntity) => visitor.blog, {
    cascade: true,
  })
  visitors: VisitorEntity[];
}
