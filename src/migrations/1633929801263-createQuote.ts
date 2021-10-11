import {MigrationInterface, QueryRunner} from "typeorm";

export class createQuote1633929801263 implements MigrationInterface {
    name = 'createQuote1633929801263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quotes" ("id" SERIAL NOT NULL, "quote" character varying NOT NULL, "data" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, CONSTRAINT "PK_99a0e8bcbcd8719d3a41f23c263" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quotes" ADD CONSTRAINT "FK_adc561cc8195c80ec2eee9cee47" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quotes" DROP CONSTRAINT "FK_adc561cc8195c80ec2eee9cee47"`);
        await queryRunner.query(`DROP TABLE "quotes"`);
    }

}
