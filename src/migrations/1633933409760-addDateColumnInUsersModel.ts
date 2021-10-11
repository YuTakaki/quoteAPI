import {MigrationInterface, QueryRunner} from "typeorm";

export class addDateColumnInUsersModel1633933409760 implements MigrationInterface {
    name = 'addDateColumnInUsersModel1633933409760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "data" TO "date"`);
        await queryRunner.query(`ALTER TABLE "quotes" RENAME COLUMN "data" TO "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" RENAME COLUMN "date" TO "data"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "date" TO "data"`);
    }

}
