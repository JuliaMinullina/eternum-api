import { Injectable, Logger } from '@nestjs/common';
import { execSync } from 'child_process';
import { join } from 'path';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async runAllSeeds(): Promise<{
    success: boolean;
    results: Array<{ name: string; success: boolean; error?: string }>;
    summary: { total: number; succeeded: number; failed: number };
  }> {
    const seeds = [
      // 1. Метатеги (должны быть первыми)
      { name: 'Метатеги', file: 'src/scripts/seed-meta-tags.ts' },
      
      // 2. Дисциплины
      { name: 'Дисциплины', file: 'src/scripts/seed-disciplines.ts' },
      
      // 3. Связи дисциплин с метатегами
      { name: 'Связи дисциплин с метатегами', file: 'src/scripts/seed-discipline-meta-tags.ts' },
      
      // 4. Темы по дисциплинам (в алфавитном порядке)
      { name: 'Темы: Английский язык', file: 'src/scripts/seed-english-topics.ts' },
      { name: 'Темы: Арабский язык', file: 'src/scripts/seed-arabic-topics.ts' },
      { name: 'Темы: Астрономия', file: 'src/scripts/seed-astronomy-topics.ts' },
      { name: 'Темы: Биология', file: 'src/scripts/seed-biology-topics.ts' },
      { name: 'Темы: География', file: 'src/scripts/seed-geography-topics.ts' },
      { name: 'Темы: Изобразительное искусство', file: 'src/scripts/seed-fine-arts-topics.ts' },
      { name: 'Темы: Информатика', file: 'src/scripts/seed-informatics-topics.ts' },
      { name: 'Темы: Испанский язык', file: 'src/scripts/seed-spanish-topics.ts' },
      { name: 'Темы: История России', file: 'src/scripts/seed-russian-history-topics.ts' },
      { name: 'Темы: Китайский язык', file: 'src/scripts/seed-chinese-topics.ts' },
      { name: 'Темы: Культурология', file: 'src/scripts/seed-culturology-topics.ts' },
      { name: 'Темы: Литература', file: 'src/scripts/seed-literature-topics.ts' },
      { name: 'Темы: Математика', file: 'src/scripts/seed-mathematics-topics.ts' },
      { name: 'Темы: Математический анализ', file: 'src/scripts/seed-mathematical-analysis-topics.ts' },
      { name: 'Темы: Мировая история', file: 'src/scripts/seed-world-history-topics.ts' },
      { name: 'Темы: Мировая художественная культура', file: 'src/scripts/seed-fine-arts-culture-topics.ts' },
      { name: 'Темы: Музыка', file: 'src/scripts/seed-music-topics.ts' },
      { name: 'Темы: Немецкий язык', file: 'src/scripts/seed-german-topics.ts' },
      { name: 'Темы: Общая психология', file: 'src/scripts/seed-general-psychology-topics.ts' },
      { name: 'Темы: ОБЖ', file: 'src/scripts/seed-life-safety-topics.ts' },
      { name: 'Темы: Обществознание', file: 'src/scripts/seed-social-studies-topics.ts' },
      { name: 'Темы: Право', file: 'src/scripts/seed-law-topics.ts' },
      { name: 'Темы: Русский язык', file: 'src/scripts/seed-russian-topics.ts' },
      { name: 'Темы: Физика', file: 'src/scripts/seed-physics-topics.ts' },
      { name: 'Темы: Физическая культура', file: 'src/scripts/seed-physical-education-topics.ts' },
      { name: 'Темы: Философия', file: 'src/scripts/seed-philosophy-topics.ts' },
      { name: 'Темы: Французский язык', file: 'src/scripts/seed-french-topics.ts' },
      { name: 'Темы: Химия', file: 'src/scripts/seed-chemistry-topics.ts' },
      { name: 'Темы: Экология', file: 'src/scripts/seed-ecology-topics.ts' },
      { name: 'Темы: Экономика', file: 'src/scripts/seed-economics-topics.ts' },
      { name: 'Темы: Технология', file: 'src/scripts/seed-technology-topics.ts' },
    ];

    const results: Array<{ name: string; success: boolean; error?: string }> = [];
    const projectRoot = process.cwd();

    this.logger.log(`🌱 Начинаю запуск всех seed файлов (всего: ${seeds.length})...`);

    for (const seed of seeds) {
      try {
        this.logger.log(`📦 Запуск: ${seed.name}...`);
        
        // Используем nest start --entryFile, как в package.json
        // Это работает как в development, так и в production
        const entryFile = seed.file.replace('.ts', ''); // Убираем расширение .ts
        const command = `nest start --entryFile ${entryFile}`;
        
        const output = execSync(command, {
          cwd: projectRoot,
          stdio: 'pipe',
          encoding: 'utf-8',
          env: { ...process.env, NODE_ENV: process.env.NODE_ENV || 'production' },
          timeout: 60000, // 60 секунд таймаут на каждый seed файл
        });
        
        // Логируем вывод если нужно
        if (output && output.trim()) {
          this.logger.debug(`Output for ${seed.name}: ${output.substring(0, 200)}`);
        }
        
        results.push({ name: seed.name, success: true });
        this.logger.log(`✅ ${seed.name} - успешно`);
      } catch (error: any) {
        const errorMessage = error.message || error.toString();
        const errorOutput = error.stdout || error.stderr || '';
        const fullError = `${errorMessage}\n${errorOutput}`.substring(0, 500);
        
        results.push({ 
          name: seed.name, 
          success: false, 
          error: fullError
        });
        this.logger.error(`❌ ${seed.name} - ошибка: ${fullError}`);
        // Продолжаем выполнение даже при ошибке
      }
    }

    const succeeded = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    this.logger.log(`\n📊 Итоги:`);
    this.logger.log(`✅ Успешно: ${succeeded}`);
    this.logger.log(`❌ Ошибок: ${failed}`);

    return {
      success: failed === 0,
      results,
      summary: {
        total: seeds.length,
        succeeded,
        failed,
      },
    };
  }
}