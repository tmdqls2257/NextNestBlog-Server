import { MigrationInterface, QueryRunner } from "typeorm";

export class test1664094155421 implements MigrationInterface {
  name = "test1664094155421";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "BLOG" ADD "imageUrl" character varying NOT NULL DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "imageUrl"`);
  }
}
