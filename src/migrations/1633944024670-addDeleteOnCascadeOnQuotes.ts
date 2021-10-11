import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeleteOnCascadeOnQuotes1633944024670 implements MigrationInterface {
    name = 'addDeleteOnCascadeOnQuotes1633944024670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" DROP CONSTRAINT "FK_adc561cc8195c80ec2eee9cee47"`);
        await queryRunner.query(`ALTER TABLE "quotes" ADD CONSTRAINT "FK_adc561cc8195c80ec2eee9cee47" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" DROP CONSTRAINT "FK_adc561cc8195c80ec2eee9cee47"`);
        await queryRunner.query(`ALTER TABLE "quotes" ADD CONSTRAINT "FK_adc561cc8195c80ec2eee9cee47" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
