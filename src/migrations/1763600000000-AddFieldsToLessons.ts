import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsToLessons1763600000000 implements MigrationInterface {
  name = 'AddFieldsToLessons1763600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Проверяем существование таблицы lessons
    const tableExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'lessons'
    `);

    if (!(Array.isArray(tableExists) && tableExists.length > 0)) {
      throw new Error('Table lessons does not exist');
    }

    // Проверяем и добавляем колонку IsVerified, если её нет
    const isVerifiedColumnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons' 
      AND column_name = 'IsVerified'
    `);

    if (!(Array.isArray(isVerifiedColumnExists) && isVerifiedColumnExists.length > 0)) {
      await queryRunner.query(`
        ALTER TABLE "lessons" 
        ADD "IsVerified" boolean NOT NULL DEFAULT false
      `);
    }

    // Проверяем и добавляем колонку Order, если её нет
    const orderColumnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons' 
      AND column_name = 'Order'
    `);

    if (!(Array.isArray(orderColumnExists) && orderColumnExists.length > 0)) {
      await queryRunner.query(`
        ALTER TABLE "lessons" 
        ADD "Order" integer
      `);
    }

    // Проверяем и добавляем колонку Description, если её нет
    const descriptionColumnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons' 
      AND column_name = 'Description'
    `);

    if (!(Array.isArray(descriptionColumnExists) && descriptionColumnExists.length > 0)) {
      await queryRunner.query(`
        ALTER TABLE "lessons" 
        ADD "Description" text
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Откат изменений - удаляем добавленные колонки

    // Проверяем существование колонки Description перед удалением
    const descriptionColumnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons' 
      AND column_name = 'Description'
    `);

    if (Array.isArray(descriptionColumnExists) && descriptionColumnExists.length > 0) {
      await queryRunner.query(`
        ALTER TABLE "lessons" 
        DROP COLUMN "Description"
      `);
    }

    // Проверяем существование колонки Order перед удалением
    const orderColumnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons' 
      AND column_name = 'Order'
    `);

    if (Array.isArray(orderColumnExists) && orderColumnExists.length > 0) {
      await queryRunner.query(`
        ALTER TABLE "lessons" 
        DROP COLUMN "Order"
      `);
    }

    // Проверяем существование колонки IsVerified перед удалением
    const isVerifiedColumnExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'lessons' 
      AND column_name = 'IsVerified'
    `);

    if (Array.isArray(isVerifiedColumnExists) && isVerifiedColumnExists.length > 0) {
      await queryRunner.query(`
        ALTER TABLE "lessons" 
        DROP COLUMN "IsVerified"
      `);
    }
  }
}

