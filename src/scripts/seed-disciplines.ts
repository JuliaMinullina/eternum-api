import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Discipline } from '../modules/discipline/discipline.entity';

const disciplinesData = [
  {
    DisciplineID: '6b1f9d2a-3c4e-4f6a-9b2d-1e0f2a3b4c5d',
    DisciplineName: 'Русский язык',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: '9a2c7e4b-8d1f-4b6c-9f3e-0a1b2c3d4e6f',
    DisciplineName: 'Литература',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'b3d2f1a9-7c4e-4a6f-8d2b-0e1f2a3b4c6d',
    DisciplineName: 'Математика',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'c4e3a2b1-6d7f-4e5a-9c1b-2f0e3a4b5c7d',
    DisciplineName: 'Физика',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'd5f4b3c2-8e1a-4b7c-9d2e-1f0a3b4c5d6e',
    DisciplineName: 'Химия',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'e6a5c4b3-9f2b-4c8d-8a1e-3b2c4d5e6f7a',
    DisciplineName: 'Биология',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'f7b6d5c4-0a3c-4d9e-8b2f-4c3d5e6f7a8b',
    DisciplineName: 'География',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'a8c7e6d5-1b4d-4e0f-9a3c-5d4e6f7a8b9c',
    DisciplineName: 'История',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'b9d8f7e6-2c5e-4f1a-8b4d-6e5f7a8b9c0d',
    DisciplineName: 'Обществознание',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'c0e9a8b7-3d6f-4a02-9e5c-7f6a8b9c0d1e',
    DisciplineName: 'Информатика и ИКТ',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'd1f0b9c8-4e7a-4b13-8f6d-8a7b9c0d1e2f',
    DisciplineName: 'Иностранный язык — Английский',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'e2a1c0b9-5f8b-4c24-9a7e-9b8c0d1e2f3a',
    DisciplineName: 'Иностранный язык — Немецкий',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'f3b2d1c0-6a9c-4d35-8b8f-0c9d1e2f3a4b',
    DisciplineName: 'Иностранный язык — Французский',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'a4c3e2d1-7b0d-4e46-9c9a-1d0e2f3a4b5c',
    DisciplineName: 'Технология',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'b5d4f3e2-8c1e-4f57-8d0b-2e1f3a4b5c6d',
    DisciplineName: 'Изобразительное искусство',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'c6e5a4b3-9d2f-4028-9e1c-3f2a4b5c6d7e',
    DisciplineName: 'Музыка',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'd7f6b5c4-0e3a-4139-8f2d-4a3b5c6d7e8f',
    DisciplineName: 'Физическая культура',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'e8a7c6b5-1f4b-4240-9a3e-5b4c6d7e8f9a',
    DisciplineName: 'Основы безопасности жизнедеятельности',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'f9b8d7c6-2a5c-4351-8b4f-6c5d7e8f9a0b',
    DisciplineName: 'Экология',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'a0c9e8d7-3b6d-4462-9b5a-7d6e8f9a0b1c',
    DisciplineName: 'Астрономия',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'b1d0f9e8-4c7e-4573-8a6b-8e7f9a0b1c2d',
    DisciplineName: 'Экономика',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  },
  {
    DisciplineID: 'c2e1a0f9-5d8f-4684-9f7c-9f8a0b1c2d3e',
    DisciplineName: 'Право',
    CreatedAt: new Date('2025-08-16T12:00:00Z'),
    UpdatedAt: new Date('2025-08-16T12:00:00Z')
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const disciplineRepository = app.get(getRepositoryToken(Discipline));
    
    console.log('🌱 Начинаю заполнение дисциплин...');
    
    // Проверяем, есть ли уже дисциплины в базе
    const existingCount = await disciplineRepository.count();
    if (existingCount > 0) {
      console.log(`⚠️  В базе уже есть ${existingCount} дисциплин. Очищаю таблицу...`);
      await disciplineRepository.clear();
    }
    
    // Создаем дисциплины
    const createdDisciplines = await disciplineRepository.save(disciplinesData);
    
    console.log(`✅ Успешно создано ${createdDisciplines.length} дисциплин:`);
    createdDisciplines.forEach(discipline => {
      console.log(`   - ${discipline.DisciplineName} (${discipline.DisciplineID})`);
    });
    
    console.log('\n🎉 Заполнение дисциплин завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении дисциплин:', error);
    throw error;
  } finally {
    await app.close();
    process.exit(0);
  }
}

bootstrap();
