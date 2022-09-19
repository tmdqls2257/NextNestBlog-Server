import { CommonEntity } from '../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BlogEntity } from '../blogs/blogs.entity';

@Entity({
  name: 'VISITOR',
})
export class VisitorEntity extends CommonEntity {
  // 블로그가 삭제되어도 엔터티는 남습니다.
  @ManyToOne(() => BlogEntity, (blog: BlogEntity) => blog.visitors, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
  blog: BlogEntity;
}
