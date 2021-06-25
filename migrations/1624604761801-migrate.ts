import {MigrationInterface, QueryRunner} from "typeorm";

export class migrate1624604761801 implements MigrationInterface {
    name = 'migrate1624604761801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Board" ALTER COLUMN "columns" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Board" ALTER COLUMN "columns" DROP NOT NULL`);
    }

}
