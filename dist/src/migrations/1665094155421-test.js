"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test1664094155421 = void 0;
class test1664094155421 {
    constructor() {
        this.name = "test1664094155421";
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "BLOG" ADD "imageUrl" character varying NOT NULL DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "BLOG" DROP COLUMN "imageUrl"`);
    }
}
exports.test1664094155421 = test1664094155421;
//# sourceMappingURL=1665094155421-test.js.map