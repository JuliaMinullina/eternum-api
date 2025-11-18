import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    
    return next.handle().pipe(
      map((data) => {
        // Если ответ уже в нужном формате, возвращаем как есть
        if (data && typeof data === 'object' && 'success' in data) {
          // Логирование для /disciplines/with-meta-tags
          if (url && url.includes('with-meta-tags') && data.data && Array.isArray(data.data)) {
            const withTags = data.data.find((d: any) => d.disciplineMetaTags && d.disciplineMetaTags.length > 0);
            if (withTags) {
              console.log('[TransformInterceptor] Discipline WITH tags:', {
                name: withTags.DisciplineName,
                tagsCount: withTags.disciplineMetaTags.length
              });
            } else {
              console.log('[TransformInterceptor] WARNING: No disciplines with tags in data!');
            }
          }
          
          return {
            ...data,
            timestamp: new Date().toISOString(),
          };
        }

        // Иначе оборачиваем в стандартный формат
        return {
          success: true,
          message: 'Operation completed successfully',
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
