import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTagEntity1664554161118 implements MigrationInterface {
    name = 'UpdateTagEntity1664554161118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "TAG" DROP COLUMN "deletedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TAG" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "TAG" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "TAG" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
