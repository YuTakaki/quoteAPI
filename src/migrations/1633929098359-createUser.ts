import {MigrationInterface, QueryRunner} from "typeorm";

export class createUser1633929098359 implements MigrationInterface {
    name = 'createUser1633929098359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "CHK_04c8de83362f06af7a18fbc90d" CHECK (LENGTH("password") > 7), CONSTRAINT "CHK_eeeca10181114264302d9f8e12" CHECK (LENGTH("username") > 7), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
