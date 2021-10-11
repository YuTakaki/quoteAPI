import {MigrationInterface, QueryRunner} from "typeorm";

export class addCheckName1633964446741 implements MigrationInterface {
    name = 'addCheckName1633964446741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CHK_04c8de83362f06af7a18fbc90d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CHK_eeeca10181114264302d9f8e12"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "passwordLengthCheck" CHECK (LENGTH("password") > 7)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "userLength" CHECK (LENGTH("username") > 7)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "userLength"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "passwordLengthCheck"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "CHK_eeeca10181114264302d9f8e12" CHECK ((length((username)::text) > 7))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "CHK_04c8de83362f06af7a18fbc90d" CHECK ((length((password)::text) > 7))`);
    }

}
