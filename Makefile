# Makefile для NestJS приложения с Docker PostgreSQL

# Переменные
APP_NAME = nestjs-app
DOCKER_COMPOSE = docker-compose
NPM = npm

# Цвета для вывода
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

# Основные команды
.PHONY: help install start stop restart logs clean build test

# Показать справку
help:
	@echo "$(GREEN)Доступные команды:$(NC)"
	@echo "$(YELLOW)Установка и настройка:$(NC)"
	@echo "  install     - Установить зависимости npm"
	@echo "  setup       - Полная настройка проекта (Docker + зависимости)"
	@echo ""
	@echo "$(YELLOW)Управление приложением:$(NC)"
	@echo "  start       - Запустить приложение и Docker контейнеры"
	@echo "  dev         - Запустить в режиме разработки"
	@echo "  stop        - Остановить приложение и контейнеры"
	@echo "  restart     - Перезапустить приложение и контейнеры"
	@echo ""
	@echo "$(YELLOW)Управление Docker:$(NC)"
	@echo "  up          - Запустить только Docker контейнеры"
	@echo "  down        - Остановить Docker контейнеры"
	@echo "  logs        - Показать логи контейнеров"
	@echo "  ps          - Показать статус контейнеров"
	@echo ""
	@echo "$(YELLOW)База данных:$(NC)"
	@echo "  db-connect  - Подключиться к PostgreSQL"
	@echo "  db-reset    - Сбросить базу данных"
	@echo "  db-backup   - Создать резервную копию БД"
	@echo ""
	@echo "$(YELLOW)Разработка:$(NC)"
	@echo "  build       - Собрать приложение"
	@echo "  test        - Запустить тесты"
	@echo "  clean       - Очистить node_modules и Docker данные"

# Установка зависимостей
install:
	@echo "$(GREEN)Устанавливаю npm зависимости...$(NC)"
	$(NPM) install

# Полная настройка проекта
setup: install up
	@echo "$(GREEN)Настройка завершена!$(NC)"
	@echo "$(YELLOW)PostgreSQL доступен на localhost:5432$(NC)"
	@echo "$(YELLOW)pgAdmin доступен на http://localhost:5050$(NC)"
	@echo "$(YELLOW)Приложение будет доступно на http://localhost:3000$(NC)"

# Запуск всего приложения
start: up
	@echo "$(GREEN)Запускаю приложение...$(NC)"
	$(NPM) run start:prod

# Запуск в режиме разработки
dev: up
	@echo "$(GREEN)Запускаю в режиме разработки...$(NC)"
	$(NPM) run start:dev

# Остановка всего
stop: down
	@echo "$(GREEN)Приложение и контейнеры остановлены$(NC)"

# Перезапуск
restart: stop start

# Docker команды
up:
	@echo "$(GREEN)Запускаю Docker контейнеры...$(NC)"
	$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)Ожидаю готовности PostgreSQL...$(NC)"
	@echo "$(YELLOW)Проверяю health check...$(NC)"
	@until docker-compose ps postgres | grep -q "healthy"; do \
		echo "$(YELLOW)PostgreSQL еще не готов, ожидаю...$(NC)"; \
		sleep 5; \
	done
	@echo "$(GREEN)PostgreSQL готов!$(NC)"
	@if [ "$(filter up,$(MAKECMDGOALS))" = "up" ]; then \
		echo "$(GREEN)Запускаю проект после запуска контейнеров (start:dev)...$(NC)"; \
		$(NPM) run start:dev; \
	fi

down:
	@echo "$(YELLOW)Останавливаю Docker контейнеры...$(NC)"
	$(DOCKER_COMPOSE) down

logs:
	@echo "$(GREEN)Логи контейнеров:$(NC)"
	$(DOCKER_COMPOSE) logs -f

ps:
	@echo "$(GREEN)Статус контейнеров:$(NC)"
	$(DOCKER_COMPOSE) ps

# Команды для базы данных
db-connect:
	@echo "$(GREEN)Подключаюсь к PostgreSQL...$(NC)"
	docker exec -it nestjs_postgres psql -U postgres -d nestjs_db

db-reset:
	@echo "$(RED)Сбрасываю базу данных...$(NC)"
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)База данных сброшена$(NC)"

db-backup:
	@echo "$(GREEN)Создаю резервную копию базы данных...$(NC)"
	@mkdir -p backups
	docker exec nestjs_postgres pg_dump -U postgres nestjs_db > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Резервная копия создана в папке backups/$(NC)"

# Команды разработки
build:
	@echo "$(GREEN)Собираю приложение...$(NC)"
	$(NPM) run build

test:
	@echo "$(GREEN)Запускаю тесты...$(NC)"
	$(NPM) run test

clean:
	@echo "$(RED)Очищаю проект...$(NC)"
	rm -rf node_modules
	rm -rf dist
	$(DOCKER_COMPOSE) down -v
	@echo "$(GREEN)Очистка завершена$(NC)"

# Команды для мониторинга
status:
	@echo "$(GREEN)Статус проекта:$(NC)"
	@echo "$(YELLOW)NPM зависимости:$(NC)"
	@if [ -d "node_modules" ]; then echo "  ✓ Установлены"; else echo "  ✗ Не установлены"; fi
	@echo "$(YELLOW)Docker контейнеры:$(NC)"
	@$(DOCKER_COMPOSE) ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
	@echo "$(YELLOW)Health check PostgreSQL:$(NC)"
	@if docker-compose ps postgres | grep -q "healthy"; then echo "  ✓ Здоров"; else echo "  ✗ Проблемы"; fi

# Команды для отладки
debug:
	@echo "$(GREEN)Информация для отладки:$(NC)"
	@echo "$(YELLOW)Версия Node.js:$(NC)"
	@node --version
	@echo "$(YELLOW)Версия npm:$(NC)"
	@npm --version
	@echo "$(YELLOW)Версия Docker:$(NC)"
	@docker --version
	@echo "$(YELLOW)Версия Docker Compose:$(NC)"
	@docker-compose --version
	@echo "$(YELLOW)Статус Docker:$(NC)"
	@docker info --format "{{.ServerVersion}}" 2>/dev/null || echo "Docker не запущен"
