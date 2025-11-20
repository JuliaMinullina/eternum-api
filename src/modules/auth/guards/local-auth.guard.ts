import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
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
