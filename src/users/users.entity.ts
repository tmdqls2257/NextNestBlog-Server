import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from '../profiles/profiles.entity';
import { BlogEntity } from '../blogs/blogs.entity';
import { ApiProperty } from '@nestjs/swagger';
// import { CommonEntity } from 'src/common/entities/common.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'USER',
}) // USER : 테이블 명
export class UserEntity extends CommonEntity {
  @ApiProperty({
    example: 'test@text.com',
    description: 'email',
    required: true,
  })
  @IsEmail({}, { message: '올바른 이메일을 작성해주세요.' })
  @IsNotEmpty({ message: '이메일을 작성해주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @ApiProperty({
    example: 'tmdqls2257',
    description: 'username',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  username: string;

  @ApiProperty({
    example: 'chl135',
    description: 'password',
    required: true,
  })
  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({
    example: true,
    description: 'password',
  })
  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  //JoinColumn은 db에 profile의 id를 저장하는데 column의 name을 profile_id로 합니다.
  @OneToOne(() => ProfileEntity)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: ProfileEntity;

  @OneToMany(() => BlogEntity, (blog: BlogEntity) => blog.author, {
    cascade: true,
  })
  blogs: BlogEntity[];
}
