import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepository } from 'typeorm';
import { RefreshToken } from '../modules/auth/refresh-token.entity';

async function cleanupExpiredTokens() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const refreshTokenRepository = getRepository(RefreshToken);

    // Удаляем истекшие токены
    const result = await refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('expiresAt < :now', { now: new Date() })
      .execute();

    console.log(`Удалено ${result.affected} истекших refresh token`);

    // Также удаляем отозванные токены старше 7 дней
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const revokedResult = await refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('isRevoked = :isRevoked AND createdAt < :date', {
        isRevoked: true,
        date: sevenDaysAgo,
      })
      .execute();

    console.log(`Удалено ${revokedResult.affected} старых отозванных token`);
  } catch (error) {
    console.error('Ошибка при очистке токенов:', error);
  } finally {
    await app.close();
  }
}

cleanupExpiredTokens();
