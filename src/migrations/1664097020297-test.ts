import { MigrationInterface, QueryRunner } from "typeorm";

export class test1664097020297 implements MigrationInterface {
    name = 'test1664097020297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "USER_PROFILE" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "bio" character varying, "site" character varying, "img_url" character varying, CONSTRAINT "PK_d79ff8d61b5ac6b41e8f47c61c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "USER" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "profile_id" uuid, CONSTRAINT "UQ_c090db0477be7a25259805e37c2" UNIQUE ("email"), CONSTRAINT "REL_6c1ff6abd2f04a563f93362d69" UNIQUE ("profile_id"), CONSTRAINT "PK_480564dbef3c7391661ce3b9d5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "email" ON "USER" ("email") `);
        await queryRunner.query(`CREATE TABLE "TAG" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying, CONSTRAINT "PK_2eb5915b98a47dcad4a6e68535e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "VISITOR" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "author_id" uuid, CONSTRAINT "PK_151b64bc123598ae5dc2e2f5f33" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "BLOG" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "contents" text DEFAULT '', "likeCount" integer DEFAULT '0', "author_id" uuid, CONSTRAINT "PK_e661e743fd743ef56c228d700f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "BLOG_TAG" ("blog_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_ea9eca1bde4561d57bf656956c1" PRIMARY KEY ("blog_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7e7df00061b9ca1c3954d1d2e5" ON "BLOG_TAG" ("blog_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_50d86ac0d2209ac2529f59b8e2" ON "BLOG_TAG" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "USER" ADD CONSTRAINT "FK_6c1ff6abd2f04a563f93362d69e" FOREIGN KEY ("profile_id") REFERENCES "USER_PROFILE"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "VISITOR" ADD CONSTRAINT "FK_bd77fb3d007144dec86b87abcb6" FOREIGN KEY ("author_id") REFERENCES "BLOG"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "BLOG" ADD CONSTRAINT "FK_3c98fea8bf0e936271239654167" FOREIGN KEY ("author_id") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "BLOG_TAG" ADD CONSTRAINT "FK_7e7df00061b9ca1c3954d1d2e5b" FOREIGN KEY ("blog_id") REFERENCES "BLOG"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "BLOG_TAG" ADD CONSTRAINT "FK_50d86ac0d2209ac2529f59b8e27" FOREIGN KEY ("tag_id") REFERENCES "TAG"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BLOG_TAG" DROP CONSTRAINT "FK_50d86ac0d2209ac2529f59b8e27"`);
        await queryRunner.query(`ALTER TABLE "BLOG_TAG" DROP CONSTRAINT "FK_7e7df00061b9ca1c3954d1d2e5b"`);
        await queryRunner.query(`ALTER TABLE "BLOG" DROP CONSTRAINT "FK_3c98fea8bf0e936271239654167"`);
        await queryRunner.query(`ALTER TABLE "VISITOR" DROP CONSTRAINT "FK_bd77fb3d007144dec86b87abcb6"`);
        await queryRunner.query(`ALTER TABLE "USER" DROP CONSTRAINT "FK_6c1ff6abd2f04a563f93362d69e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_50d86ac0d2209ac2529f59b8e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7e7df00061b9ca1c3954d1d2e5"`);
        await queryRunner.query(`DROP TABLE "BLOG_TAG"`);
        await queryRunner.query(`DROP TABLE "BLOG"`);
        await queryRunner.query(`DROP TABLE "VISITOR"`);
        await queryRunner.query(`DROP TABLE "TAG"`);
        await queryRunner.query(`DROP INDEX "public"."email"`);
        await queryRunner.query(`DROP TABLE "USER"`);
        await queryRunner.query(`DROP TABLE "USER_PROFILE"`);
    }

}
