import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export abstract class CommonEntity {
  // id를 uuid형식으로 저장합니다.
  @ApiProperty({
    example: 'de992305-c065-4644-804f-2879952e0a54',
    description: 'id',
  })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 해당 열이 추가된 시각을 자동으로 기록
  // 만일 Postgres의 time zone이 'UTC'라면 UTC 기준으로 출력하고 'Asia/Seoul'라면 서울 기준으로 출력한다.
  // DB SQL QUERY : set time zone 'Asia/Seoul'; set time zone 'UTC'; show timezone;
  @ApiProperty({
    example: '2022-09-03T03:08:48.730Z',
    description: 'createdAt',
  })
  @CreateDateColumn({
    type: 'timestamptz' /* timestamp with time zone */,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-09-03T03:08:48.730Z',
    description: 'updatedAt',
  })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // Soft Delete : 기존에는 null, 삭제시에 timestamp를 찍는다.
  // 실수로 usser의 데이터를 다 지운 경우 해당 deletedAt을 null로 바꾸면 다시 로그인이 가능합니다.
  @ApiProperty({
    example: 'null',
    description: 'deletedAt',
  })
  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date | null;
}
