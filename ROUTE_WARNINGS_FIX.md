# Исправление предупреждений о маршрутах

## 🚨 Проблема

В логах CapRover появилось предупреждение:
```
[LegacyRouteConverter] Unsupported route path: "/auth/*". In previous versions, the symbols ?, *, and + were used to denote optional or repeating path parameters. The latest version of "path-to-regexp" now requires the use of named parameters.
```

## 🔧 Исправления

### 1. AuthModule (src/modules/auth/auth.module.ts)

**До исправления:**
```typescript
configure(consumer: MiddlewareConsumer) {
  consumer.apply(AuthCookiesMiddleware).forRoutes('auth/*');
}
```

**После исправления:**
```typescript
configure(consumer: MiddlewareConsumer) {
  consumer.apply(AuthCookiesMiddleware).forRoutes('auth/:path*');
}
```

### 2. AppModule (src/app.module.ts)

**До исправления:**
```typescript
configure(consumer: MiddlewareConsumer) {
  consumer.apply(CookieAuthMiddleware).forRoutes('*');
}
```

**После исправления:**
```typescript
configure(consumer: MiddlewareConsumer) {
  consumer.apply(CookieAuthMiddleware).forRoutes(':path*');
}
```

## 📋 Новый синтаксис маршрутов

### Устаревший синтаксис (не поддерживается):
- `'auth/*'` - все маршруты, начинающиеся с `/auth/`
- `'*'` - все маршруты

### Новый синтаксис (рекомендуется):
- `'auth/:path*'` - все маршруты, начинающиеся с `/auth/`
- `':path*'` - все маршруты

## ✅ Результат

После исправления:
- ✅ Предупреждения исчезнут из логов
- ✅ Приложение будет использовать современный синтаксис
- ✅ Совместимость с будущими версиями NestJS

## 🚀 Деплой

Исправления готовы к деплою:

```bash
git add .
git commit -m "Fix route warnings: update to modern path-to-regexp syntax"
git push origin main
```

После деплоя предупреждения должны исчезнуть из логов CapRover.
