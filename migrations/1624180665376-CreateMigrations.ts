import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMigrations1624180665376 implements MigrationInterface {
    name = 'CreateMigrations1624180665376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(120) NOT NULL, "order" integer NOT NULL, "boardId" uuid, CONSTRAINT "PK_df0aa166f1a3f0526fcbd77ca72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(120) NOT NULL, CONSTRAINT "PK_a898df2ad483f1ad130bdcb56cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "login" character varying(50) NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(120) NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userId" uuid, "boardId" uuid, "columnId" uuid, CONSTRAINT "PK_95d9364b8115119ba8b15a43592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Column" ADD CONSTRAINT "FK_02dc49ed56f866f12b1dd43404a" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_b9a04beac0d49f34e711895715c" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_498d662fc3defa2b901e89f2ffd" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_a25cc8a5dde30a5c517672f6f2b" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_a25cc8a5dde30a5c517672f6f2b"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_498d662fc3defa2b901e89f2ffd"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_b9a04beac0d49f34e711895715c"`);
        await queryRunner.query(`ALTER TABLE "Column" DROP CONSTRAINT "FK_02dc49ed56f866f12b1dd43404a"`);
        await queryRunner.query(`DROP TABLE "Task"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Board"`);
        await queryRunner.query(`DROP TABLE "Column"`);
    }

}
