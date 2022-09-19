import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1663434148444 implements MigrationInterface {
  name = 'test1663434148444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" DROP COLUMN "created_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "is_admin"`);
    await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "VISITOR" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "VISITOR" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "VISITOR" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "like_count"`);
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER" ADD "isAdmin" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "TAG" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "TAG" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "TAG" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "VISITOR" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "VISITOR" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "VISITOR" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "likeCount" integer DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "likeCount"`);
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "VISITOR" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "VISITOR" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "VISITOR" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "isAdmin"`);
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "USER" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "like_count" integer DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "VISITOR" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "VISITOR" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "VISITOR" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "TAG" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "TAG" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "TAG" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER" ADD "is_admin" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "USER_PROFILE" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }
}
