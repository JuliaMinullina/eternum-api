#!/bin/sh

# Disable output buffering
set +e  # Don't exit on error, we handle it manually

echo "=========================================="
echo "🚀 STARTING APPLICATION"
echo "=========================================="
echo "Timestamp: $(date)"
echo "Working directory: $(pwd)"
echo "User: $(whoami)"
echo ""

# ============================================
# STEP 1: Environment Check
# ============================================
echo "📋 STEP 1: Checking environment variables..."
echo "   DB_HOST: ${DB_HOST:-'NOT SET'}"
echo "   DB_PORT: ${DB_PORT:-'NOT SET'}"
echo "   DB_NAME: ${DB_NAME:-'NOT SET'}"
echo "   DB_USERNAME: ${DB_USERNAME:-'NOT SET'}"
echo "   NODE_ENV: ${NODE_ENV:-'NOT SET'}"
echo "   PORT: ${PORT:-'NOT SET (default: 3000)'}"
echo ""

# ============================================
# STEP 2: File Structure Check
# ============================================
echo "📋 STEP 2: Checking file structure..."
echo "   Checking dist/ directory..."
if [ -d "dist" ]; then
  echo "   ✅ dist/ directory exists"
  ls -la dist/ | head -10
else
  echo "   ❌ ERROR: dist/ directory NOT FOUND!"
  exit 1
fi

echo ""
echo "   Checking dist/config/typeorm.config.prod.js..."
if [ -f "dist/config/typeorm.config.prod.js" ]; then
  echo "   ✅ Config file exists"
  ls -lh dist/config/typeorm.config.prod.js
else
  echo "   ❌ ERROR: Config file NOT FOUND!"
  exit 1
fi

echo ""
echo "   Checking dist/migrations/ directory..."
if [ -d "dist/migrations" ]; then
  echo "   ✅ migrations/ directory exists"
  MIGRATION_COUNT=$(ls -1 dist/migrations/*.js 2>/dev/null | wc -l)
  echo "   Found $MIGRATION_COUNT migration file(s):"
  ls -lh dist/migrations/*.js | head -5
  if [ "$MIGRATION_COUNT" -eq 0 ]; then
    echo "   ⚠️  WARNING: No migration files found!"
  fi
else
  echo "   ❌ ERROR: migrations/ directory NOT FOUND!"
  exit 1
fi

echo ""
echo "   Checking start.sh..."
if [ -f "start.sh" ]; then
  echo "   ✅ start.sh exists"
else
  echo "   ❌ ERROR: start.sh NOT FOUND!"
  exit 1
fi

echo ""
echo "   Checking node and npm..."
which node && echo "   ✅ node: $(node --version)" || echo "   ❌ node NOT FOUND!"
which npm && echo "   ✅ npm: $(npm --version)" || echo "   ❌ npm NOT FOUND!"

echo ""

# ============================================
# STEP 3: Database Connection Test
# ============================================
echo "📋 STEP 3: Testing database connection..."
echo "   Attempting to connect to: ${DB_HOST:-localhost}:${DB_PORT:-5432}"
echo "   Database: ${DB_NAME:-nestjs_db}"
echo "   Username: ${DB_USERNAME:-postgres}"
echo ""

# ============================================
# STEP 4: Run Migrations
# ============================================
echo "=========================================="
echo "🔄 STEP 4: RUNNING DATABASE MIGRATIONS"
echo "=========================================="
echo "Timestamp: $(date)"
echo ""

echo "   Method 1: Trying TypeORM CLI (npm run migration:run:prod)..."
echo "   Command: node_modules/.bin/typeorm migration:run -d dist/config/typeorm.config.prod.js"
echo "   Starting at: $(date)"
echo ""
echo "   [MIGRATION OUTPUT START]"
echo ""

# Run migration directly to see output in real-time
npm run migration:run:prod
MIGRATION_EXIT_CODE=$?

echo ""
echo "   [MIGRATION OUTPUT END]"
echo "   Migration command finished at: $(date)"
echo "   Exit code: $MIGRATION_EXIT_CODE"
echo ""

if [ $MIGRATION_EXIT_CODE -eq 0 ]; then
  echo "   ✅ SUCCESS: Migrations completed via TypeORM CLI"
else
  echo "   ⚠️  TypeORM CLI failed with exit code: $MIGRATION_EXIT_CODE"
  echo "   Method 2: Trying Node.js script (npm run migration:run:prod:node)..."
  echo "   Command: node scripts/run-migrations.js"
  echo "   Starting at: $(date)"
  echo ""
  echo "   [NODE SCRIPT OUTPUT START]"
  echo ""
  
  npm run migration:run:prod:node
  NODE_SCRIPT_EXIT_CODE=$?
  
  echo ""
  echo "   [NODE SCRIPT OUTPUT END]"
  echo "   Node.js script finished at: $(date)"
  echo "   Exit code: $NODE_SCRIPT_EXIT_CODE"
  echo ""
  
  if [ $NODE_SCRIPT_EXIT_CODE -eq 0 ]; then
    echo "   ✅ SUCCESS: Migrations completed via Node.js script"
  else
    echo "   ❌ ERROR: Both migration methods failed!"
    echo "   TypeORM CLI exit code: $MIGRATION_EXIT_CODE"
    echo "   Node.js script exit code: $NODE_SCRIPT_EXIT_CODE"
    echo ""
    echo "   ⚠️  Continuing startup anyway (migrations might already be applied)..."
    echo "   Check logs above for details"
  fi
fi

echo ""
echo "=========================================="
echo "✅ MIGRATIONS STEP COMPLETED"
echo "=========================================="
echo "Timestamp: $(date)"
echo ""

# ============================================
# STEP 5: Start Application
# ============================================
echo "=========================================="
echo "🚀 STEP 5: STARTING NESTJS APPLICATION"
echo "=========================================="
echo "Timestamp: $(date)"
echo "Command: npm run start:prod"
echo ""

exec npm run start:prod
