import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context) as Observable<boolean>;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      console.error('🔐 LocalAuthGuard: Authentication failed', {
        err: err?.message,
        info: info?.message,
        user: user ? 'exists' : 'missing',
      });
    }
    return super.handleRequest(err, user, info, context);
  }
}
